import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { generateDocument } from "./services/ai";
import { completeFormSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Health check endpoint for monitoring
  app.get("/api/health", (req, res) => {
    res.json({
      status: "healthy",
      timestamp: new Date().toISOString(),
      version: "1.0.0",
      environment: process.env.NODE_ENV || "development"
    });
  });

  // Create document endpoint
  app.post("/api/documents", async (req, res) => {
    try {
      const formData = completeFormSchema.parse(req.body);
      
      // Generate AI content
      const generatedContent = await generateDocument(formData);
      
      // Store document
      const document = await storage.createDocument({
        type: formData.documentType,
        language: formData.language,
        data: formData,
        generatedContent,
      });

      res.json(document);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          message: "Validation error", 
          errors: error.errors 
        });
      } else {
        console.error('Error creating document:', error);
        res.status(500).json({ 
          message: "Failed to create document" 
        });
      }
    }
  });

  // Get document endpoint
  app.get("/api/documents/:id", async (req, res) => {
    try {
      const document = await storage.getDocument(req.params.id);
      if (!document) {
        return res.status(404).json({ message: "Document not found" });
      }
      res.json(document);
    } catch (error) {
      console.error('Error fetching document:', error);
      res.status(500).json({ message: "Failed to fetch document" });
    }
  });

  // Update document endpoint
  app.put("/api/documents/:id", async (req, res) => {
    try {
      const formData = completeFormSchema.parse(req.body);
      
      // Regenerate AI content
      const generatedContent = await generateDocument(formData);
      
      const document = await storage.updateDocument(req.params.id, {
        type: formData.documentType,
        language: formData.language,
        data: formData,
        generatedContent,
      });

      if (!document) {
        return res.status(404).json({ message: "Document not found" });
      }

      res.json(document);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          message: "Validation error", 
          errors: error.errors 
        });
      } else {
        console.error('Error updating document:', error);
        res.status(500).json({ 
          message: "Failed to update document" 
        });
      }
    }
  });

  // List documents endpoint
  app.get("/api/documents", async (req, res) => {
    try {
      const documents = await storage.listDocuments();
      res.json(documents);
    } catch (error) {
      console.error('Error listing documents:', error);
      res.status(500).json({ message: "Failed to list documents" });
    }
  });

  // Delete document endpoint
  app.delete("/api/documents/:id", async (req, res) => {
    try {
      const success = await storage.deleteDocument(req.params.id);
      if (!success) {
        return res.status(404).json({ message: "Document not found" });
      }
      res.json({ message: "Document deleted successfully" });
    } catch (error) {
      console.error('Error deleting document:', error);
      res.status(500).json({ message: "Failed to delete document" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

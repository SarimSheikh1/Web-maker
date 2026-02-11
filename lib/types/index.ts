export * from './blocks'
export * from './theme'

import { z } from 'zod'

// Project schemas
export const projectSchema = z.object({
  id: z.string(),
  userId: z.string(),
  name: z.string().min(1, 'Project name is required'),
  slug: z.string().min(1, 'Project slug is required').regex(/^[a-z0-9-]+$/, 'Slug must contain only lowercase letters, numbers, and hyphens'),
  isPublished: z.boolean().default(false),
  publishedAt: z.date().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const pageSchema = z.object({
  id: z.string(),
  projectId: z.string(),
  name: z.string().min(1, 'Page name is required'),
  path: z.string().min(1, 'Page path is required').regex(/^\/[a-z0-9-\/]*$/, 'Path must start with / and contain only lowercase letters, numbers, hyphens, and slashes'),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  isVisible: z.boolean().default(true),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const assetSchema = z.object({
  id: z.string(),
  projectId: z.string(),
  url: z.string().url(),
  key: z.string(),
  filename: z.string(),
  mimeType: z.string(),
  size: z.number(),
  width: z.number().nullable(),
  height: z.number().nullable(),
  createdAt: z.date(),
})

export const formSubmissionSchema = z.object({
  id: z.string(),
  projectId: z.string(),
  pageId: z.string().nullable(),
  formBlockId: z.string().nullable(),
  payload: z.record(z.any()),
  createdAt: z.date(),
})

export const publishSnapshotSchema = z.object({
  id: z.string(),
  projectId: z.string(),
  publishedAt: z.date(),
  snapshotJSON: z.record(z.any()),
  versionNumber: z.number(),
})

// API request/response schemas
export const createProjectSchema = z.object({
  name: z.string().min(1, 'Project name is required'),
  slug: z.string().min(1, 'Project slug is required').regex(/^[a-z0-9-]+$/, 'Slug must contain only lowercase letters, numbers, and hyphens'),
  templateId: z.string().optional(),
})

export const updateProjectSchema = z.object({
  name: z.string().min(1, 'Project name is required').optional(),
  slug: z.string().min(1, 'Project slug is required').regex(/^[a-z0-9-]+$/, 'Slug must contain only lowercase letters, numbers, and hyphens').optional(),
})

export const createPageSchema = z.object({
  name: z.string().min(1, 'Page name is required'),
  path: z.string().min(1, 'Page path is required').regex(/^\/[a-z0-9-\/]*$/, 'Path must start with / and contain only lowercase letters, numbers, hyphens, and slashes'),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  isVisible: z.boolean().default(true),
})

export const updatePageSchema = z.object({
  name: z.string().min(1, 'Page name is required').optional(),
  path: z.string().min(1, 'Page path is required').regex(/^\/[a-z0-9-\/]*$/, 'Path must start with / and contain only lowercase letters, numbers, hyphens, and slashes').optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  isVisible: z.boolean().optional(),
})

export const createBlockSchema = z.object({
  type: z.string(),
  variant: z.string().default('default'),
  order: z.number(),
  props: z.record(z.any()).default({}),
  style: z.record(z.any()).default({}),
})

export const updateBlockSchema = z.object({
  variant: z.string().optional(),
  order: z.number().optional(),
  props: z.record(z.any()).optional(),
  style: z.record(z.any()).optional(),
})

export const reorderBlocksSchema = z.object({
  blockIds: z.array(z.string()),
})

export const submitFormSchema = z.object({
  name: z.string().min(1, 'Name is required').optional(),
  email: z.string().email('Invalid email address').optional(),
  subject: z.string().optional(),
  message: z.string().min(1, 'Message is required').optional(),
})

// Type exports
export type Project = z.infer<typeof projectSchema>
export type Page = z.infer<typeof pageSchema>
export type Asset = z.infer<typeof assetSchema>
export type FormSubmission = z.infer<typeof formSubmissionSchema>
export type PublishSnapshot = z.infer<typeof publishSnapshotSchema>

export type CreateProject = z.infer<typeof createProjectSchema>
export type UpdateProject = z.infer<typeof updateProjectSchema>
export type CreatePage = z.infer<typeof createPageSchema>
export type UpdatePage = z.infer<typeof updatePageSchema>
export type CreateBlock = z.infer<typeof createBlockSchema>
export type UpdateBlock = z.infer<typeof updateBlockSchema>
export type ReorderBlocks = z.infer<typeof reorderBlocksSchema>
export type SubmitForm = z.infer<typeof submitFormSchema>
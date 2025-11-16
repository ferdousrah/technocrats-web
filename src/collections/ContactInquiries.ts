import type { CollectionConfig } from 'payload'
import { isAuthenticated, isEditor } from '../access'

export const ContactInquiries: CollectionConfig = {
  slug: 'contact-inquiries',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'serviceInterest', 'status', 'createdAt'],
  },
  access: {
    read: isAuthenticated, // Only authenticated users can read/manage inquiries
    create: () => true, // Allow public to create inquiries
    update: isEditor,
    delete: isEditor,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Full Name',
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      admin: {
        description: 'Contact email address',
      },
    },
    {
      name: 'phone',
      type: 'text',
      required: false,
      admin: {
        description: 'Contact phone number (optional)',
      },
    },
    {
      name: 'company',
      type: 'text',
      required: false,
      admin: {
        description: 'Company or organization name (optional)',
      },
    },
    {
      name: 'serviceInterest',
      type: 'relationship',
      relationTo: 'services',
      required: false,
      hasMany: true,
      admin: {
        description: 'Services interested in',
      },
    },
    {
      name: 'projectType',
      type: 'select',
      required: false,
      options: [
        { label: 'New Project', value: 'new-project' },
        { label: 'Consulting', value: 'consulting' },
        { label: 'Support/Maintenance', value: 'support' },
        { label: 'Partnership', value: 'partnership' },
        { label: 'Other', value: 'other' },
      ],
    },
    {
      name: 'budget',
      type: 'select',
      required: false,
      options: [
        { label: 'Under $5,000', value: 'under-5k' },
        { label: '$5,000 - $10,000', value: '5k-10k' },
        { label: '$10,000 - $25,000', value: '10k-25k' },
        { label: '$25,000 - $50,000', value: '25k-50k' },
        { label: '$50,000+', value: '50k-plus' },
        { label: 'Not sure yet', value: 'unsure' },
      ],
      admin: {
        description: 'Estimated project budget',
      },
    },
    {
      name: 'timeline',
      type: 'select',
      required: false,
      options: [
        { label: 'Urgent (< 1 month)', value: 'urgent' },
        { label: '1-3 months', value: '1-3-months' },
        { label: '3-6 months', value: '3-6-months' },
        { label: '6+ months', value: '6-plus-months' },
        { label: 'Flexible', value: 'flexible' },
      ],
      admin: {
        description: 'Desired project timeline',
      },
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Inquiry message or project details',
      },
    },
    {
      name: 'source',
      type: 'select',
      required: false,
      options: [
        { label: 'Search Engine', value: 'search' },
        { label: 'Social Media', value: 'social' },
        { label: 'Referral', value: 'referral' },
        { label: 'Advertisement', value: 'ad' },
        { label: 'Direct', value: 'direct' },
        { label: 'Other', value: 'other' },
      ],
      admin: {
        description: 'How did they hear about us?',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'In Progress', value: 'in-progress' },
        { label: 'Contacted', value: 'contacted' },
        { label: 'Qualified', value: 'qualified' },
        { label: 'Proposal Sent', value: 'proposal-sent' },
        { label: 'Converted', value: 'converted' },
        { label: 'Not Interested', value: 'not-interested' },
        { label: 'Closed', value: 'closed' },
      ],
      admin: {
        description: 'Inquiry status for tracking',
      },
    },
    {
      name: 'assignedTo',
      type: 'relationship',
      relationTo: 'users',
      required: false,
      admin: {
        description: 'Team member assigned to this inquiry',
      },
    },
    {
      name: 'priority',
      type: 'select',
      required: false,
      defaultValue: 'medium',
      options: [
        { label: 'Low', value: 'low' },
        { label: 'Medium', value: 'medium' },
        { label: 'High', value: 'high' },
        { label: 'Urgent', value: 'urgent' },
      ],
    },
    {
      name: 'notes',
      type: 'textarea',
      required: false,
      admin: {
        description: 'Internal notes (not visible to client)',
      },
    },
    {
      name: 'followUpDate',
      type: 'date',
      required: false,
      admin: {
        description: 'Scheduled follow-up date',
      },
    },
  ],
  timestamps: true,
}

'use client'

import { Block, ContactProps } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Mail, Phone, MapPin } from 'lucide-react'

interface ContactBlockProps {
  block: Block & { type: 'contact' }
}

export function ContactBlock({ block }: ContactBlockProps) {
  const props = block.props as ContactProps
  const { title, subtitle, showForm, formFields, contactInfo, textAnimation } = props

  const getVariantClasses = () => {
    switch (block.variant) {
      case 'split':
        return 'grid md:grid-cols-2 gap-12 items-start'
      case 'centered':
        return 'max-w-2xl mx-auto text-center'
      case 'minimal':
        return 'max-w-xl mx-auto'
      default:
        return 'max-w-4xl mx-auto'
    }
  }

  const getAnimationClasses = () => {
    if (!textAnimation || textAnimation.type === 'none') return ''
    
    switch (textAnimation.type) {
      case 'fadeUp':
        return 'animate-fade-up'
      case 'blurIn':
        return 'animate-blur-in'
      default:
        return ''
    }
  }

  const renderContactInfo = () => {
    if (!contactInfo) return null

    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Get in Touch
          </h3>
          <p className="text-gray-600 mb-6">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="space-y-4">
          {contactInfo.email && (
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Mail className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="font-medium text-gray-900">Email</div>
                <div className="text-gray-600">{contactInfo.email}</div>
              </div>
            </div>
          )}

          {contactInfo.phone && (
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Phone className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="font-medium text-gray-900">Phone</div>
                <div className="text-gray-600">{contactInfo.phone}</div>
              </div>
            </div>
          )}

          {contactInfo.address && (
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="font-medium text-gray-900">Address</div>
                <div className="text-gray-600">{contactInfo.address}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  const renderForm = () => {
    if (!showForm) return null

    return (
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Send us a message</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            {formFields?.name && (
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input id="name" placeholder="Your name" required />
              </div>
            )}

            {formFields?.email && (
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input id="email" type="email" placeholder="your@email.com" required />
              </div>
            )}

            {formFields?.subject && (
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="Message subject" />
              </div>
            )}

            {formFields?.message && (
              <div className="space-y-2">
                <Label htmlFor="message">Message *</Label>
                <Textarea 
                  id="message" 
                  placeholder="Your message..." 
                  rows={5}
                  required 
                />
              </div>
            )}

            <Button type="submit" className="w-full">
              Send Message
            </Button>
          </form>
        </CardContent>
      </Card>
    )
  }

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="container mx-auto">
        <div className={cn('mb-16 text-center', getAnimationClasses())}>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {title || 'Contact Us'}
          </h2>
          {subtitle && (
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        <div className={getVariantClasses()}>
          {block.variant === 'split' ? (
            <>
              {renderContactInfo()}
              {renderForm()}
            </>
          ) : (
            <div className="space-y-8">
              {renderForm()}
              {contactInfo && (
                <div className="text-center">
                  {renderContactInfo()}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
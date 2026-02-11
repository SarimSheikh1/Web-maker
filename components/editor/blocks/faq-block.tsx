'use client'

import { Block, FAQProps } from '@/lib/types'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { cn } from '@/lib/utils'

interface FAQBlockProps {
  block: Block & { type: 'faq' }
}

export function FAQBlock({ block }: FAQBlockProps) {
  const props = block.props as FAQProps
  const { title, subtitle, faqs, layout } = props

  const defaultFAQs = [
    {
      id: '1',
      question: 'How does the free trial work?',
      answer: 'You get full access to all features for 14 days, no credit card required. You can upgrade or cancel at any time during the trial period.',
    },
    {
      id: '2',
      question: 'Can I change my plan later?',
      answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately and you\'ll be charged or credited accordingly.',
    },
    {
      id: '3',
      question: 'Is my data secure?',
      answer: 'Absolutely. We use enterprise-grade security measures including encryption, regular backups, and secure data centers to protect your information.',
    },
    {
      id: '4',
      question: 'Do you offer customer support?',
      answer: 'Yes, we provide email support for all plans and priority support for Professional and Enterprise customers. Our team typically responds within 24 hours.',
    },
  ]

  const displayFAQs = faqs?.length > 0 ? faqs : defaultFAQs

  if (layout === 'grid') {
    return (
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {title || 'Frequently Asked Questions'}
            </h2>
            {subtitle && (
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {displayFAQs.map((faq) => (
              <div key={faq.id} className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {title || 'Frequently Asked Questions'}
          </h2>
          {subtitle && (
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {displayFAQs.map((faq) => (
              <AccordionItem
                key={faq.id}
                value={faq.id}
                className="bg-white rounded-lg shadow-sm border-0 px-6"
              >
                <AccordionTrigger className="text-left font-semibold text-gray-900 hover:no-underline py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 leading-relaxed pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
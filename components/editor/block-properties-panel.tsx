'use client'

import { Block, blockVariants } from '@/lib/types'
import { useEditor } from './editor-provider'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'

interface BlockPropertiesPanelProps {
  block: Block
}

export function BlockPropertiesPanel({ block }: BlockPropertiesPanelProps) {
  const { updateBlock } = useEditor()

  const updateProps = (updates: any) => {
    updateBlock(block.id, { props: { ...block.props, ...updates } })
  }

  const updateStyle = (updates: any) => {
    updateBlock(block.id, { style: { ...block.style, ...updates } })
  }

  const renderHeroProperties = () => {
    const props = block.props as any
    return (
      <div className="space-y-4">
        <div>
          <Label htmlFor="headline">Headline</Label>
          <Input
            id="headline"
            value={props.headline || ''}
            onChange={(e) => updateProps({ headline: e.target.value })}
            placeholder="Your Amazing Headline"
          />
        </div>
        
        <div>
          <Label htmlFor="subheadline">Subheadline</Label>
          <Textarea
            id="subheadline"
            value={props.subheadline || ''}
            onChange={(e) => updateProps({ subheadline: e.target.value })}
            placeholder="A compelling subheadline..."
            rows={3}
          />
        </div>

        <div>
          <Label htmlFor="primary-cta">Primary CTA Text</Label>
          <Input
            id="primary-cta"
            value={props.primaryCTA?.text || ''}
            onChange={(e) => updateProps({ 
              primaryCTA: { ...props.primaryCTA, text: e.target.value }
            })}
            placeholder="Get Started"
          />
        </div>

        <div>
          <Label htmlFor="primary-cta-href">Primary CTA Link</Label>
          <Input
            id="primary-cta-href"
            value={props.primaryCTA?.href || ''}
            onChange={(e) => updateProps({ 
              primaryCTA: { ...props.primaryCTA, href: e.target.value }
            })}
            placeholder="#contact"
          />
        </div>

        <div>
          <Label htmlFor="background-image">Background Image URL</Label>
          <Input
            id="background-image"
            value={props.backgroundImage || ''}
            onChange={(e) => updateProps({ backgroundImage: e.target.value })}
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <Separator />
        <div className="text-sm font-medium">Text Animation</div>
        
        <div>
          <Label htmlFor="animation-type">Animation Type</Label>
          <Select
            value={props.textAnimation?.type || 'none'}
            onValueChange={(value) => updateProps({ 
              textAnimation: { ...props.textAnimation, type: value }
            })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="fadeUp">Fade Up</SelectItem>
              <SelectItem value="fadeDown">Fade Down</SelectItem>
              <SelectItem value="fadeLeft">Fade Left</SelectItem>
              <SelectItem value="fadeRight">Fade Right</SelectItem>
              <SelectItem value="blurIn">Blur In</SelectItem>
              <SelectItem value="scaleIn">Scale In</SelectItem>
              <SelectItem value="rotateIn">Rotate In</SelectItem>
              <SelectItem value="slideUp">Slide Up</SelectItem>
              <SelectItem value="slideDown">Slide Down</SelectItem>
              <SelectItem value="flipIn">Flip In</SelectItem>
              <SelectItem value="typewriter">Typewriter</SelectItem>
              <SelectItem value="gradientShimmer">Gradient Shimmer</SelectItem>
              <SelectItem value="rainbowShimmer">Rainbow Shimmer</SelectItem>
              <SelectItem value="bounceGentle">Bounce Gentle</SelectItem>
              <SelectItem value="pulseGlow">Pulse Glow</SelectItem>
              <SelectItem value="float">Float</SelectItem>
              <SelectItem value="wiggle">Wiggle</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {props.textAnimation?.type !== 'none' && (
          <>
            <div>
              <Label htmlFor="animation-duration">Duration (ms)</Label>
              <Input
                id="animation-duration"
                type="number"
                min="100"
                max="5000"
                value={props.textAnimation?.durationMs || 1000}
                onChange={(e) => updateProps({ 
                  textAnimation: { ...props.textAnimation, durationMs: parseInt(e.target.value) }
                })}
              />
            </div>
            
            <div>
              <Label htmlFor="animation-delay">Delay (ms)</Label>
              <Input
                id="animation-delay"
                type="number"
                min="0"
                max="2000"
                value={props.textAnimation?.delayMs || 0}
                onChange={(e) => updateProps({ 
                  textAnimation: { ...props.textAnimation, delayMs: parseInt(e.target.value) }
                })}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="animation-once"
                checked={props.textAnimation?.once !== false}
                onCheckedChange={(checked) => updateProps({ 
                  textAnimation: { ...props.textAnimation, once: checked }
                })}
              />
              <Label htmlFor="animation-once">Animate Only Once</Label>
            </div>
          </>
        )}
      </div>
    )
  }

  const renderNavbarProperties = () => {
    const props = block.props as any
    return (
      <div className="space-y-4">
        <div>
          <Label htmlFor="logo-text">Logo Text</Label>
          <Input
            id="logo-text"
            value={props.logo?.text || ''}
            onChange={(e) => updateProps({ 
              logo: { ...props.logo, text: e.target.value }
            })}
            placeholder="Your Logo"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="show-cta"
            checked={props.showCTA || false}
            onCheckedChange={(checked) => updateProps({ showCTA: checked })}
          />
          <Label htmlFor="show-cta">Show CTA Button</Label>
        </div>

        {props.showCTA && (
          <>
            <div>
              <Label htmlFor="cta-text">CTA Text</Label>
              <Input
                id="cta-text"
                value={props.ctaText || ''}
                onChange={(e) => updateProps({ ctaText: e.target.value })}
                placeholder="Get Started"
              />
            </div>
            <div>
              <Label htmlFor="cta-href">CTA Link</Label>
              <Input
                id="cta-href"
                value={props.ctaHref || ''}
                onChange={(e) => updateProps({ ctaHref: e.target.value })}
                placeholder="#contact"
              />
            </div>
          </>
        )}

        <div className="flex items-center space-x-2">
          <Switch
            id="sticky"
            checked={props.sticky || false}
            onCheckedChange={(checked) => updateProps({ sticky: checked })}
          />
          <Label htmlFor="sticky">Sticky Navigation</Label>
        </div>
      </div>
    )
  }

  const renderContactProperties = () => {
    const props = block.props as any
    return (
      <div className="space-y-4">
        <div>
          <Label htmlFor="contact-title">Title</Label>
          <Input
            id="contact-title"
            value={props.title || ''}
            onChange={(e) => updateProps({ title: e.target.value })}
            placeholder="Contact Us"
          />
        </div>

        <div>
          <Label htmlFor="contact-subtitle">Subtitle</Label>
          <Textarea
            id="contact-subtitle"
            value={props.subtitle || ''}
            onChange={(e) => updateProps({ subtitle: e.target.value })}
            placeholder="Get in touch with us..."
            rows={2}
          />
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="show-form"
            checked={props.showForm !== false}
            onCheckedChange={(checked) => updateProps({ showForm: checked })}
          />
          <Label htmlFor="show-form">Show Contact Form</Label>
        </div>

        <Separator />
        <div className="text-sm font-medium">Form Fields</div>
        
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Switch
              id="field-name"
              checked={props.formFields?.name !== false}
              onCheckedChange={(checked) => updateProps({ 
                formFields: { ...props.formFields, name: checked }
              })}
            />
            <Label htmlFor="field-name">Name Field</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch
              id="field-email"
              checked={props.formFields?.email !== false}
              onCheckedChange={(checked) => updateProps({ 
                formFields: { ...props.formFields, email: checked }
              })}
            />
            <Label htmlFor="field-email">Email Field</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch
              id="field-subject"
              checked={props.formFields?.subject || false}
              onCheckedChange={(checked) => updateProps({ 
                formFields: { ...props.formFields, subject: checked }
              })}
            />
            <Label htmlFor="field-subject">Subject Field</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch
              id="field-message"
              checked={props.formFields?.message !== false}
              onCheckedChange={(checked) => updateProps({ 
                formFields: { ...props.formFields, message: checked }
              })}
            />
            <Label htmlFor="field-message">Message Field</Label>
          </div>
        </div>
      </div>
    )
  }

  const renderGenericProperties = () => {
    const props = block.props as any
    return (
      <div className="space-y-4">
        {props.title !== undefined && (
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={props.title || ''}
              onChange={(e) => updateProps({ title: e.target.value })}
              placeholder="Section Title"
            />
          </div>
        )}

        {props.subtitle !== undefined && (
          <div>
            <Label htmlFor="subtitle">Subtitle</Label>
            <Textarea
              id="subtitle"
              value={props.subtitle || ''}
              onChange={(e) => updateProps({ subtitle: e.target.value })}
              placeholder="Section subtitle..."
              rows={2}
            />
          </div>
        )}

        {/* Animation controls for blocks that support it */}
        {props.textAnimation !== undefined && (
          <>
            <Separator />
            <div className="text-sm font-medium">Text Animation</div>
            
            <div>
              <Label htmlFor="animation-type">Animation Type</Label>
              <Select
                value={props.textAnimation?.type || 'none'}
                onValueChange={(value) => updateProps({ 
                  textAnimation: { ...props.textAnimation, type: value }
                })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="fadeUp">Fade Up</SelectItem>
                  <SelectItem value="fadeDown">Fade Down</SelectItem>
                  <SelectItem value="fadeLeft">Fade Left</SelectItem>
                  <SelectItem value="fadeRight">Fade Right</SelectItem>
                  <SelectItem value="blurIn">Blur In</SelectItem>
                  <SelectItem value="scaleIn">Scale In</SelectItem>
                  <SelectItem value="rotateIn">Rotate In</SelectItem>
                  <SelectItem value="slideUp">Slide Up</SelectItem>
                  <SelectItem value="slideDown">Slide Down</SelectItem>
                  <SelectItem value="flipIn">Flip In</SelectItem>
                  <SelectItem value="typewriter">Typewriter</SelectItem>
                  <SelectItem value="gradientShimmer">Gradient Shimmer</SelectItem>
                  <SelectItem value="rainbowShimmer">Rainbow Shimmer</SelectItem>
                  <SelectItem value="bounceGentle">Bounce Gentle</SelectItem>
                  <SelectItem value="pulseGlow">Pulse Glow</SelectItem>
                  <SelectItem value="float">Float</SelectItem>
                  <SelectItem value="wiggle">Wiggle</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {props.textAnimation?.type !== 'none' && (
              <>
                <div>
                  <Label htmlFor="animation-duration">Duration (ms)</Label>
                  <Input
                    id="animation-duration"
                    type="number"
                    min="100"
                    max="5000"
                    value={props.textAnimation?.durationMs || 1000}
                    onChange={(e) => updateProps({ 
                      textAnimation: { ...props.textAnimation, durationMs: parseInt(e.target.value) }
                    })}
                  />
                </div>
                
                <div>
                  <Label htmlFor="animation-delay">Delay (ms)</Label>
                  <Input
                    id="animation-delay"
                    type="number"
                    min="0"
                    max="2000"
                    value={props.textAnimation?.delayMs || 0}
                    onChange={(e) => updateProps({ 
                      textAnimation: { ...props.textAnimation, delayMs: parseInt(e.target.value) }
                    })}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="animation-once"
                    checked={props.textAnimation?.once !== false}
                    onCheckedChange={(checked) => updateProps({ 
                      textAnimation: { ...props.textAnimation, once: checked }
                    })}
                  />
                  <Label htmlFor="animation-once">Animate Only Once</Label>
                </div>
              </>
            )}
          </>
        )}
      </div>
    )
  }

  const renderBlockProperties = () => {
    switch (block.type) {
      case 'hero':
        return renderHeroProperties()
      case 'navbar':
        return renderNavbarProperties()
      case 'contact':
        return renderContactProperties()
      default:
        return renderGenericProperties()
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-3">Block Settings</h3>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="variant">Variant</Label>
            <Select
              value={block.variant}
              onValueChange={(value) => updateBlock(block.id, { variant: value as any })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {blockVariants[block.type].map((variant) => (
                  <SelectItem key={variant} value={variant}>
                    {variant.charAt(0).toUpperCase() + variant.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-3">Content</h3>
        {renderBlockProperties()}
      </div>

      <Separator />

      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-3">Styling</h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="bg-color">Background Color</Label>
            <Input
              id="bg-color"
              type="color"
              value={block.style?.backgroundColor || '#ffffff'}
              onChange={(e) => updateStyle({ backgroundColor: e.target.value })}
            />
          </div>
          
          <div>
            <Label htmlFor="text-color">Text Color</Label>
            <Input
              id="text-color"
              type="color"
              value={block.style?.textColor || '#000000'}
              onChange={(e) => updateStyle({ textColor: e.target.value })}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
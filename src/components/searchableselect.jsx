'use client'

import * as React from 'react'
import * as Popover from '@radix-ui/react-popover'
import { useTheme } from 'next-themes'
import { ChevronDownIcon } from 'lucide-react'
import { Button } from './ui/button'

export const SearchableSelect = ({
  items,
  value,
  placeholder = 'Select an item',
  disabled = false,
  onValueChange,
  className = '',
}) => {
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState('')
  const inputRef = React.useRef(null)
  const {theme}=useTheme()

  const selectedItem = items.find((item) => String(item.id) === String(value))

  const filteredItems = React.useMemo(() => {
    const term = search.trim().toLowerCase()
    if (!term) return items.slice(0, 50)
    return items
      .filter((item) => item.name.toLowerCase().includes(term))
      .slice(0, 20)
  }, [search, items])

  React.useEffect(() => {
    if (open) {
      const timeout = setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
      return () => clearTimeout(timeout)
    }
  }, [open])


  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <Button
          variant="outline"
          disabled={disabled}
          className={`h-10 w-full flex justify-between items-center rounded-md border ${theme === 'dark' ? 'border-input' : 'border-primary text-gray-500'}  bg-background px-3 py-2 text-left text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
        >
          {selectedItem ? selectedItem.name : value || placeholder}
           <ChevronDownIcon className="size-4  opacity-50" />
        </Button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          forceMount
          align="start"
          side="bottom"
          sideOffset={4}
          onOpenAutoFocus={(e) => e.preventDefault()}
          onWheel={(e) => e.stopPropagation()}
          className="z-[999] bg-background relative mt-1 min-w-72 w-[var(--radix-popover-trigger-width)] rounded-md border-2 border-input  p-2 text-popover-foreground shadow-md pointer-events-auto touch-auto"
        >
          <input
            ref={inputRef}
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onMouseDown={(e) => e.stopPropagation()}
            className="mb-2 w-full bg-background rounded-md border border-input px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
         
 
          {/* ✅ Scrollable container with mobile support */}
          <div
            className="relative max-h-60 overflow-y-auto overscroll-contain scrollbar-thin scrollbar-thumb-muted-foreground scrollbar-track-transparent -mx-2 px-2"
            style={{
              WebkitOverflowScrolling: 'touch', // iOS momentum scroll
              touchAction: 'pan-y',
              overscrollBehavior: 'contain',
            }}
            onTouchStart={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
          >
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    onValueChange(String(item.id))
                    setOpen(false)
                    setSearch('')
                  }}
                  className={`cursor-pointer rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground ${
                    value === String(item.id) ? 'bg-muted' : ''
                  }`}
                >
                  {item.name}
                </div>
              ))
            ) : (
              <div className="px-3 py-2 text-sm text-muted-foreground">
                No items found
              </div>
            )}
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}

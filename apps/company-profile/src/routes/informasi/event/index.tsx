import { createFileRoute } from '@tanstack/react-router'
import { Breadcrumb } from '../../../components/breadcrumb'


export const Route = createFileRoute('/informasi/event/')({
  component: EventPage,
})

const events = [
  { id: 1, title: "Lorem Ipsum is Simply Dummy Text", date: '14 Maret 2026', image: null },
  { id: 2, title: "Lorem Ipsum is Simply Dummy Text", date: '14 Maret 2026', image: null },
  { id: 3, title: "Lorem Ipsum is Simply Dummy Text", date: '14 Maret 2026', image: null },
  { id: 4, title: "Lorem Ipsum is Simply Dummy Text", date: '14 Maret 2026', image: null },
  { id: 5, title: "Lorem Ipsum is Simply Dummy Text", date: '14 Maret 2026', image: null },
  { id: 6, title: "Lorem Ipsum is Simply Dummy Text", date: '14 Maret 2026', image: null }
]

function ImagePlaceholder ({ className }: { className?: string}) {
    return (
        <div className={`bg-gray-200 ${className}`}/>
    )
}

export default function EventPage(){
  return (
    <div>
      <Breadcrumb items={[
        {label: 'Beranda', href:'/'},
        {label: 'Event'}
      ]}
      />

      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col gap-8">
        {/* Banner */}
        <ImagePlaceholder className='w-full h-72 rounded-xl'/>
        
        {/* Grid Event */}
        <div className="grid grid-cols-3 gap-6">
          {events.map((gridEvent) => (
            <div key={gridEvent.id} className='border rounded-xl flex flex-col shadow-[0_4px_6px_rgba(0,0,0,0.1)]'>
              <ImagePlaceholder className='w-full h-40 rounded-t-xl'/>
              <div className="px-4 py-3 flex flex-col gap-2">
                <h3 className="text-sm font-bold">{gridEvent.title}</h3>
                <p className='text-xs text-gray-400'>{gridEvent.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}


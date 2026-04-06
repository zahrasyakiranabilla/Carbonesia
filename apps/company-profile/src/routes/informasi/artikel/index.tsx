import { createFileRoute, Link } from '@tanstack/react-router'
import { Breadcrumb } from '../../../components/breadcrumb'

export const Route = createFileRoute('/informasi/artikel/')({
  component: ArtikelPage,
})

const featuredArticle = {
    id: 1,
    title: 'Lorem Ipsum is Simply Dummy Text',
    excerpt: 'of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
    image: null,
}

const sideArticles = [
    { id: 1, title: 'Lorem Ipsum is Simply Dummy Text', image: null },
    { id: 2, title: 'Lorem Ipsum is Simply Dummy Text', image: null },
    { id: 3, title: 'Lorem Ipsum is Simply Dummy Text', image: null }
]

const gridArticles = [
    {
        id: 1,
        title: 'Lorem Ipsum is Simply Dummy Text',
        excerpt: 'of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
        image: null
    },
    {
        id: 2,
        title: 'Lorem Ipsum is Simply Dummy Text',
        excerpt: 'of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
        image: null
    },
    {
        id: 3,
        title: 'Lorem Ipsum is Simply Dummy Text',
        excerpt: 'of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
        image: null
    },
    {
        id: 4,
        title: 'Lorem Ipsum is Simply Dummy Text',
        excerpt: 'of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
        image: null
    },
]

function ImagePlaceholder ({ className }: { className?: string}) {
    return (
        <div className={`bg-gray-200 rounded-xl ${className}`}/>
    )
}

export default function ArtikelPage(){
    return (
        <div>
            <Breadcrumb items={[
                {label: 'Beranda', href: '/'},
                {label: 'Artikel'}
            ]}
            />

            <div className="max-auto px-10 py-4 flex flex-col gap-6">
                {/* Section 1: Featured + Side Articles */}
                <div className="p-6 flex gap-6 items-stretch">
                    {/* Featured Article */}
                    <div className="p-8 w-1/2 flex flex-col gap-3 shadow-[0_4px_16px_rgba(0,0,0,0.1)] rounded-2xl">
                        <ImagePlaceholder className="w-full h-56" />
                        <h2 className="text-lg font-bold text-center">{featuredArticle.title}</h2>
                        <p className="text-sm text-gray-600 text-justify">{featuredArticle.excerpt}</p>
                    </div>

                    {/* Side Article */}
                     <div className="w-1/2 flex flex-col gap-4">
                        {sideArticles.map((article) => (
                        <div
                            key={article.id}
                            className="flex-1 p-4 flex items-center gap-5 shadow-[0_4px_6px_rgba(0,0,0,0.1)] rounded-2xl"
                        >
                            <ImagePlaceholder className="w-14 h-14 rounded-full shrink-0" />
                            <h3 className="text-sm font-bold">{article.title}</h3>
                        </div>
                        ))}
                    </div>
                </div>

                {/* Section 2 : Grid Articles */}
                <div className="p-6 grid grid-cols-2 gap-6">
                    {gridArticles.map((article) => (
                        <div key={article.id} className='border rounded-2xl p-4 flex gap-4 flex-col shadow-[0_4px_6px_rgba(0,0,0,0.1)]'>
                            <div className="flex gap-4">
                                <ImagePlaceholder className='w-32 h-32 shrink-0'/>
                                <div className="flex flex-col gap-2">
                                    <h3 className="text-sm font-bold">{article.title}</h3>
                                    <p className='text-xs text-gray-600 text-justify'>{article.excerpt}</p>
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <Link
                                to="/informasi/artikel/$id"
                                params={{ id:String(article.id) }}
                                className="text-sm text-blue-900 font-medium hover:underline"
                                > 
                                Baca Selengkapnya
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
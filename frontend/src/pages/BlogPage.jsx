import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import PageHero from '../components/PageHero'
import LineIcon from '../components/LineIcon'

const CATEGORIES = [
  { key: 'all', label: 'All Posts' },
  { key: 'exam_tips', label: 'Exam Tips' },
  { key: 'career', label: 'Career Guidance' },
  { key: 'news', label: 'News & Announcements' },
  { key: 'achievement', label: 'Student Achievements' },
]

const POSTS = [
  {
    id: 1,
    category: 'exam_tips',
    title: 'Top 10 Time Management Tips for IIT-JEE 2026',
    excerpt: 'Effective time management is the key differentiator between toppers and average performers in IIT-JEE. Here are 10 proven strategies...',
    author: 'Dr. Ananya Mehta',
    date: 'April 15, 2026',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800',
  },
  {
    id: 2,
    category: 'exam_tips',
    title: 'NEET UG 2026: Complete Chapter-wise Weightage Analysis',
    excerpt: 'Understanding the chapter-wise weightage helps you prioritise your NEET preparation. Our analysis of the last 5 years reveals...',
    author: 'Mr. Rohan Verma',
    date: 'April 10, 2026',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800',
  },
  {
    id: 3,
    category: 'career',
    title: 'Career Options After NEET: Beyond MBBS',
    excerpt: 'Did you know there are over 20 exciting career paths you can pursue with a NEET score? From BDS to Pharmacy and Nursing...',
    author: 'Ms. Isha Kapoor',
    date: 'April 5, 2026',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800',
  },
  {
    id: 4,
    category: 'career',
    title: 'Engineering vs. Medicine: How to Choose the Right Path',
    excerpt: 'The choice between engineering and medicine is one of the most important decisions in a student\'s life. Here\'s a comprehensive guide...',
    author: 'Admin',
    date: 'March 28, 2026',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800',
  },
  {
    id: 5,
    category: 'news',
    title: 'Shakti Education Trust Opens New Batch for IIT-JEE 2027',
    excerpt: 'We are thrilled to announce the opening of the new IIT-JEE 2027 batch. Seats are limited and filling up fast...',
    author: 'Admin',
    date: 'March 20, 2026',
    readTime: '2 min read',
    image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800',
  },
  {
    id: 6,
    category: 'achievement',
    title: 'Our Students Secure Top Ranks in JEE Mains 2026!',
    excerpt: '15 students from Shakti Education Trust secured ranks under 5000 in JEE Mains 2026. We are incredibly proud of their achievement...',
    author: 'Admin',
    date: 'March 10, 2026',
    readTime: '3 min read',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800',
  },
]

const CATEGORY_COLORS = {
  exam_tips: 'bg-blue-100 text-blue-700',
  career: 'bg-sky-100 text-sky-700',
  news: 'bg-cyan-100 text-cyan-700',
  achievement: 'bg-primary-light text-primary-dark',
}

const CATEGORY_LABELS = {
  exam_tips: 'Exam Tips',
  career: 'Career Guidance',
  news: 'News',
  achievement: 'Achievement',
}

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('all')

  const displayed = activeCategory === 'all'
    ? POSTS
    : POSTS.filter(p => p.category === activeCategory)

  const featured = POSTS[0]

  return (
    <div className="font-body bg-white min-h-screen">
      <Navbar />

      <PageHero
        eyebrow="Blog"
        title="Exam Tips & Career Guidance"
        description="Stay ahead with our expert articles on exam preparation, career planning, and the latest news from Shakti Education Trust."
      />

      {/* Featured Post */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-primary text-xs font-semibold tracking-[0.3em] uppercase mb-5">Featured Article</p>
          <div className="grid lg:grid-cols-2 gap-8 items-center bg-white rounded-lg overflow-hidden shadow-md border border-gray-200 hover-lift">
            <img
              src={featured.image}
              alt={featured.title}
              className="h-64 lg:h-full w-full object-cover"
            />
            <div className="p-8">
              <span className={`text-xs font-bold uppercase px-3 py-1 rounded-full ${CATEGORY_COLORS[featured.category]}`}>
                {CATEGORY_LABELS[featured.category]}
              </span>
              <h2 className="font-heading text-3xl font-bold text-gray-900 mt-4 mb-3">{featured.title}</h2>
              <p className="text-gray-600 leading-relaxed mb-5">{featured.excerpt}</p>
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                <span>{featured.author}</span>
                <span>{featured.date}</span>
                <span>{featured.readTime}</span>
              </div>
              <button className="btn-primary inline-flex items-center gap-2">
                Read Full Article
                <LineIcon name="arrowRight" className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="py-14">
        <div className="max-w-6xl mx-auto px-6">
          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {CATEGORIES.map(c => (
              <button
                key={c.key}
                onClick={() => setActiveCategory(c.key)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                  activeCategory === c.key
                    ? 'bg-primary text-white shadow-md shadow-primary/20'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Post grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayed.map(post => (
              <article key={post.id} className="rounded-lg border border-gray-200 overflow-hidden shadow-sm bg-white hover-lift">
                <div className="relative">
                  <img src={post.image} alt={post.title} className="w-full h-44 object-cover" />
                  <span className={`absolute top-3 left-3 text-xs font-bold uppercase px-2 py-1 rounded-full ${CATEGORY_COLORS[post.category]}`}>
                    {CATEGORY_LABELS[post.category]}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-heading text-xl font-bold text-gray-900 mb-2 leading-tight">{post.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>{post.date}</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {displayed.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              <p className="text-lg font-semibold">No posts in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-14 bg-dark text-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-heading text-3xl font-bold uppercase mb-3">Stay Updated</h2>
          <p className="text-gray-400 mb-7">
            Subscribe to our newsletter for the latest exam tips, news, and scholarship announcements.
          </p>
          <div className="flex flex-col gap-3 max-w-md mx-auto sm:flex-row">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary"
            />
            <button className="btn-primary whitespace-nowrap inline-flex items-center gap-2">
              Subscribe
              <LineIcon name="arrowRight" className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

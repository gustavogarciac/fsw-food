import { Header } from '@/components/header'
import { SearchInput } from '@/components/search-input'

export default function Home() {
  return (
    <main>
      <Header />

      <div className="px-5 pt-6">
        <SearchInput />
      </div>
    </main>
  )
}

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

const Pokemon = () => {
  const nav = useNavigate()

  type Pokemon = {
    id?: string
    name: string
    url: string
  }
  const [pokemon, setPokemon] = useState<Pokemon[]>([])
  const [displayedPokemon, setDisplayedPokemon] = useState<Pokemon[]>([])
  const [search, setSearch] = useState<string>('')

  const handleSearchInput = (e: any) => {
    setSearch(e.detail.value)
  }

  useEffect(() => {
    const filtered = pokemon.filter((n) => {
      return n.name.toUpperCase().includes(search.toUpperCase())
    })
    setDisplayedPokemon(filtered)
  }, [search, pokemon])

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=30')
      .then((response) => response.json())
      .then((data) => {
        const pokemonRes = data.results.map((n: Pokemon) => {
          return {
            id: n.url.split('/').slice(-2)[0],
            ...n
          }
        })
        setPokemon(pokemonRes)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <view>
      <view className='App'>
        <view className='Content'>
          <text className='Title'>look at all of these pokemon.</text>
          <input className='Input' bindinput={handleSearchInput} value={search} placeholder="search..." />
          <scroll-view scroll-orientation="vertical" style={{ display: "flex", width: "100%", height: "500px" }}>
            {displayedPokemon.map((p, idx) => (
              <view key={idx} style={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", border: "1", borderColor: "gray" }}>
                <image className="pokemon" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.id}.png`} />
                <text>
                  {p.id}. {p.name.slice(0, 1).toUpperCase() + p.name.slice(1)}
                </text>
              </view>
            ))}
          </scroll-view>
          <text className='mt-4 text-base' bindtap={() => nav('/')}>
            go back
          </text>
        </view>
      </view>
    </view>
  )
}

export default Pokemon;

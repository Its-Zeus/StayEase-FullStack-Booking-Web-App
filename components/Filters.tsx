"use client"
import React, { useEffect, useState } from "react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import getLocation from "@/app/utils/getLocation"
import { ICity, IState } from "country-state-city"
import { useRouter, useSearchParams } from "next/navigation"
import qs from "query-string"
import { Button } from "./ui/button"
import { X } from "lucide-react"

const Filters = () => {
  const [country, setCountry] = useState("")
  const [state, setState] = useState("")
  const [city, setCity] = useState("")
  const [states, setStates] = useState<IState[]>([])
  const [cities, setCities] = useState<ICity[]>([])
  const {
    getAllCountries,
    getCountryByCode,
    getStateByCode,
    getCountryStates,
    getStateCities,
  } = getLocation()
  const countries = getAllCountries()
  const router = useRouter()
  const params = useSearchParams()

  useEffect(() => {
    if (country) {
      const states = getCountryStates(country)
      setStates(states)
    }
  }, [country])
  useEffect(() => {
    if (state) {
      const cities = getStateCities(country, state)
      setCities(cities)
    }
  }, [state])

  useEffect(() => {
    if (country === "" && state === "" && city === "") {
      return router.push("/")
    }
    let currentQuery: any = {}
    if (params) {
      currentQuery = qs.parse(params.toString())
    }
    if (country) {
      currentQuery = {
        ...currentQuery,
        country,
      }
    }
    if (state) {
      currentQuery = {
        ...currentQuery,
        state,
      }
    }
    if (city) {
      currentQuery = {
        ...currentQuery,
        city,
      }
    }
    if (state === "" && currentQuery.state) {
      delete currentQuery.state
    }
    if (city === "" && currentQuery.city) {
      delete currentQuery.city
    }
    const url = qs.stringifyUrl(
      {
        url: "/",
        query: currentQuery,
      },
      {
        skipNull: true,
        skipEmptyString: true,
      }
    )
    router.push(url)
  }, [city, state, country])

  const handleReset = () => {
    setCountry("")
    setState("")
    setCity("")
  }
  return (
    <div className="flex gap-4 justify-center flex-wrap">
      <div>
        <Select value={country} onValueChange={setCountry}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a Country" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {countries.map((country) => (
                <SelectItem key={country.isoCode} value={country.isoCode}>
                  {country.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Select
          value={state}
          onValueChange={setState}
          disabled={states.length === 0}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a State" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {states.map((state) => (
                <SelectItem key={state.isoCode} value={state.isoCode}>
                  {state.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Select
          value={city}
          onValueChange={setCity}
          disabled={cities.length === 0}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a City" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {cities.map((city) => (
                <SelectItem key={city.name} value={city.name}>
                  {city.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      {country && (
        <Button onClick={() => handleReset()}>
          <X className="w-5 h-5" />
          Clear Filters
        </Button>
      )}
    </div>
  )
}

export default Filters

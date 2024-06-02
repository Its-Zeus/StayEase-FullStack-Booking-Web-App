"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { Property } from "@prisma/client"
import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import axios from "axios"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "./ui/textarea"
import { Switch } from "./ui/switch"
import { Input } from "./ui/input"
import { UploadButton, UploadDropzone } from "./uploadthing"
import { useToast } from "@/components/ui/use-toast"
import Image from "next/image"
import { Button } from "./ui/button"
import getLocation from "@/app/utils/getLocation"
import { ICity, IState } from "country-state-city"
import prismadb from "@/lib/prismadb"
import { useRouter } from "next/navigation"
import {
  Bath,
  Bed,
  CigaretteOff,
  CircleParking,
  DoorClosed,
  Dumbbell,
  HandPlatter,
  Loader2,
  LoaderCircle,
  Pencil,
  PencilLine,
  Trash,
  UserRound,
  Utensils,
  Waves,
  Wifi,
} from "lucide-react"

interface AddPropertyType {
  property: PropertylType | null
}

const categories = [
  "Hotel",
  "House",
  "Apartment",
  "Hostel",
  "Resort",
  "Villa",
  "Cabin",
  "Cottage",
  "Guesthouse",
]

export type PropertylType = Property

const formSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters" }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters" }),
  category: z.string().min(1, { message: "Category is required" }),
  images: z.string().min(1, { message: "Images is required" }),
  country: z.string().min(1, { message: "Country is required" }),
  state: z.string().optional(),
  city: z.string().optional(),
  locationDescription: z.string().optional(),
  guests: z
    .string()
    .nonempty({ message: "Guests count is required" })
    .transform((str) => {
      const parsed = parseInt(str)
      if (isNaN(parsed)) {
        throw new Error("Guests count must be a number")
      }
      return parsed
    }),
  Bedrooms: z
    .string()
    .nonempty({ message: "Bedrooms count is required" })
    .transform((str) => {
      const parsed = parseInt(str)
      if (isNaN(parsed)) {
        throw new Error("Bedrooms count must be a number")
      }
      return parsed
    }),
  Beds: z
    .string()
    .nonempty({ message: "Beds count is required" })
    .transform((str) => {
      const parsed = parseInt(str)
      if (isNaN(parsed)) {
        throw new Error("Beds count must be a number")
      }
      return parsed
    }),
  gym: z.boolean().optional(),
  publicPool: z.boolean().optional(),
  freeWifi: z.boolean().optional(),
  restaurant: z.boolean().optional(),
  parking: z.boolean().optional(),
  noSmoking: z.boolean().optional(),
  bathtub: z.boolean().optional(),
  roomServices: z.boolean().optional(),
  price: z.union([z.string(), z.number()]).transform((value) => {
    if (typeof value === "string") {
      const parsed = parseInt(value, 10)
      if (isNaN(parsed)) {
        throw new Error("Price must be a valid number")
      }
      return parsed
    } else if (typeof value === "number") {
      return value
    } else {
      throw new Error("Price must be a valid number")
    }
  }),
})

const AddPropertyForm = ({ property }: AddPropertyType) => {
  const [images, setImages] = useState<string[] | undefined>(
    property?.images.split(",") || undefined
  )
  const [states, setStates] = useState<IState[]>([])
  const [cities, setCities] = useState<ICity[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [imageDeleting, setImageDeleting] = useState(false)
  const { toast } = useToast()
  const router = useRouter()
  const {
    getAllCountries,
    getCountryByCode,
    getStateByCode,
    getCountryStates,
    getStateCities,
  } = getLocation()
  const countries = getAllCountries()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: property || {
      title: "",
      description: "",
      category: "",
      images: "",
      country: "",
      state: "",
      city: "",
      locationDescription: "",
      guests: 1,
      Bedrooms: 1,
      Beds: 1,
      gym: false,
      publicPool: false,
      freeWifi: false,
      restaurant: false,
      parking: false,
      noSmoking: false,
      bathtub: false,
      roomServices: false,
      price: 100,
    },
  })
  useEffect(() => {
    const country = form.watch("country")
    const countrystates = getCountryStates(country)
    if (countrystates) {
      setStates(countrystates)
    }
  }, [form.watch("country")])
  useEffect(() => {
    const currentCountry = form.watch("country")
    const currentState = form.watch("state")
    const statecities = getStateCities(currentCountry, currentState)
    if (statecities) {
      setCities(statecities)
    }
  }, [form.watch("country"), form.watch("state")])
  useEffect(() => {
    if (images) {
      //cairfull
      form.setValue("images", images.join(","), {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      })
    }
  }, [images])

  const HandleImageDelete = (image: String) => {
    setImageDeleting(true)
    const imageKey = image.substring(image.lastIndexOf("/") + 1)
    axios
      .post("/api/uploadthing/remove", { imageKey })
      .then((res) => {
        if (res.status === 200) {
          toast({
            variant: "success",
            description: "Image deleted successfully",
          })
          const newimages = images?.filter((img) => img !== image)
          setImages(newimages)
        }
      })
      .catch((err) => {
        toast({
          variant: "destructive",
          description: "Something went wrong",
        })
      })
      .finally(() => {
        setImageDeleting(false)
      })
  }
  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    if (property) {
      axios
        .patch(`/api/property/${property.id}`, values)
        .then((res) => {
          toast({
            variant: "success",
            description: "Property updated successfully",
          })
          router.push(`/dashboard/properties/${property.id}`)
          setIsLoading(false)
        })
        .catch((err) => {
          console.log(err)
          toast({
            variant: "destructive",
            description: "Something went wrong",
          })
          setIsLoading(false)
        })
    } else {
      axios
        .post("/api/property", values)
        .then((res) => {
          toast({
            variant: "success",
            description: "Property added successfully",
          })
          router.push(`/dashboard/properties/${res.data.id}`)
          setIsLoading(false)
        })
        .catch((err) => {
          console.log(err)
          toast({
            variant: "destructive",
            description: "Something went wrong",
          })
          setIsLoading(false)
        })
    }
    //console.log(values)
  }
  return (
    <div>
      <h1 className="font-bold text-3xl my-8">
        {property ? "Update your property" : "Add a new property"}
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex flex-col md:flex-row gap-10">
            <div className="flex-1 flex flex-col gap-10">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title *</FormLabel>
                    <FormDescription>
                      Provide your property title
                    </FormDescription>
                    <FormControl>
                      <Input placeholder="Title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description *</FormLabel>
                    <FormDescription>
                      Provide a description of your property
                    </FormDescription>
                    <FormControl>
                      <Textarea placeholder="Description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category *</FormLabel>
                    <FormDescription>
                      Choose the category of your property
                    </FormDescription>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category, index) => (
                            <SelectItem value={category} key={index}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>
                <FormLabel>Amenities</FormLabel>
                <FormDescription className="mb-3">
                  Choose Amenities of your property
                </FormDescription>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="gym"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center gap-2">
                        <FormControl className="mt-2">
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="flex flex-row items-center gap-2">
                          <Dumbbell className="h-4 w-4" />
                          <FormLabel>Gym</FormLabel>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="publicPool"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center gap-2">
                        <FormControl className="mt-2">
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="flex flex-row items-center gap-2">
                          <Waves className="h-4 w-4" />
                          <FormLabel>Public Pool</FormLabel>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="freeWifi"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center gap-2">
                        <FormControl className="mt-2">
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="flex flex-row items-center gap-2">
                          <Wifi className="h-4 w-4" />
                          <FormLabel>Free Wifi</FormLabel>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="restaurant"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center gap-2">
                        <FormControl className="mt-2">
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="flex flex-row items-center gap-2">
                          <Utensils className="h-4 w-4" />
                          <FormLabel>Restaurant</FormLabel>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="parking"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center gap-2">
                        <FormControl className="mt-2">
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="flex flex-row items-center gap-2">
                          <CircleParking className="h-4 w-4" />
                          <FormLabel>Parking</FormLabel>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="noSmoking"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center gap-2">
                        <FormControl className="mt-2">
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="flex flex-row items-center gap-2">
                          <CigaretteOff className="h-4 w-4" />
                          <FormLabel>No Smoking</FormLabel>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="bathtub"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center gap-2">
                        <FormControl className="mt-2">
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="flex flex-row items-center gap-2">
                          <Bath className="h-4 w-4" />
                          <FormLabel>Bathtub</FormLabel>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="roomServices"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center gap-2">
                        <FormControl className="mt-2">
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="flex flex-row items-center gap-2">
                          <HandPlatter className="h-4 w-4" />
                          <FormLabel>Room Services</FormLabel>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div>
                <FormLabel>Capacity Details</FormLabel>
                <FormDescription>
                  Choose Capacity of your property
                </FormDescription>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="guests"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center gap-2">
                        <FormControl className="mt-2">
                          <Input
                            type="number"
                            min={0}
                            max={20}
                            placeholder="Guests"
                            className="w-20"
                            {...field}
                          />
                        </FormControl>
                        <div className="flex flex-row items-center gap-2">
                          <UserRound className="h-4 w-4" />
                          <FormLabel>Guests</FormLabel>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="Beds"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center gap-2">
                        <FormControl className="mt-2">
                          <Input
                            type="number"
                            min={0}
                            max={20}
                            placeholder="Beds"
                            className="w-20"
                            {...field}
                          />
                        </FormControl>
                        <div className="flex flex-row items-center gap-2">
                          <Bed className="h-4 w-4" />
                          <FormLabel>Beds</FormLabel>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="Bedrooms"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center gap-2">
                        <FormControl className="mt-2">
                          <Input
                            type="number"
                            min={0}
                            max={20}
                            placeholder="Bedrooms"
                            className="w-20"
                            {...field}
                          />
                        </FormControl>
                        <div className="flex flex-row items-center gap-2">
                          <DoorClosed className="h-4 w-4" />
                          <FormLabel>Bedrooms</FormLabel>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <FormField
                control={form.control}
                name="images"
                render={({ field }) => (
                  <FormItem>
                    <div className="mb-5">
                      <FormLabel>Upload your property images *</FormLabel>
                      <FormDescription>
                        You can upload up to 6 images
                      </FormDescription>
                    </div>
                    {images && images.length > 0 && (
                      <div className="grid grid-cols-3 gap-4">
                        {images.map((img, index) => (
                          <div
                            key={index}
                            className="rounded-lg overflow-hidden relative"
                          >
                            <Image
                              src={img}
                              width={500}
                              height={500}
                              alt="property image"
                              className="w-full h-full object-cover aspect-square"
                            />
                            <div className="absolute bg-black/50 top-0 left-0 right-0 bottom-0 opacity-0 hover:opacity-100">
                              {!imageDeleting ? (
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  text-white border-white border-2 rounded-full hover:text-primary hover:border-primary">
                                  <Trash
                                    className="m-2 h-8 w-8 cursor-pointer"
                                    onClick={() => HandleImageDelete(img)}
                                  />
                                </div>
                              ) : (
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  text-white hover:text-primary hover:border-primary">
                                  <LoaderCircle className="m-2 h-8 w-8 animate-spin" />
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    <FormControl>
                      <div className="flex flex-col items-center  p-16 border-2 border-dashed border-foreground/50 rounded">
                        {images && images.length >= 6 && (
                          <p className="text-destructive mb-2">
                            You can only upload up to 6 images
                          </p>
                        )}
                        <UploadButton
                          className={`ut-button:bg-primary ${
                            images && images.length >= 6
                              ? "ut-button:pointer-events-none"
                              : ""
                          }`}
                          endpoint="imageUploader"
                          onClientUploadComplete={(res) => {
                            // Do something with the response
                            res.forEach((img) => {
                              setImages((prev) => [...(prev || []), img.url])
                            })
                            toast({
                              variant: "success",
                              description: "Image uploaded successfully",
                            })
                          }}
                          onUploadError={(error: Error) => {
                            // Do something with the error.
                            toast({
                              variant: "destructive",
                              description: error.message,
                            })
                          }}
                        />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="flex-1 flex flex-col">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select Country *</FormLabel>
                      <FormDescription>
                        In which country your property is located?
                      </FormDescription>
                      <Select
                        disabled={isLoading}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue
                            defaultValue={field.value}
                            placeholder="Select a Country"
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {countries.map((country) => (
                            <SelectItem
                              key={country.isoCode}
                              value={country.isoCode}
                            >
                              {country.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select State</FormLabel>
                      <FormDescription>
                        In which State your property is located?
                      </FormDescription>
                      <Select
                        disabled={isLoading || states.length < 1}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue
                            defaultValue={field.value}
                            placeholder="Select a State"
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {states.map((state) => (
                            <SelectItem
                              key={state.isoCode}
                              value={state.isoCode}
                            >
                              {state.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select City</FormLabel>
                      <FormDescription>
                        In which City your property is located?
                      </FormDescription>
                      <Select
                        disabled={isLoading || cities.length < 1}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue
                            defaultValue={field.value}
                            placeholder="Select a City"
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {cities.map((city) => (
                            <SelectItem key={city.name} value={city.name}>
                              {city.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col gap-4 mt-6">
                <FormField
                  control={form.control}
                  name="locationDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location Description</FormLabel>
                      <FormDescription>
                        You can add more details about your property&apos;s
                        location.
                      </FormDescription>
                      <FormControl>
                        <Textarea
                          placeholder="Location Description"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormDescription>
                        How much you want to charge per night?
                      </FormDescription>
                      <div className="flex flex-row items-center gap-2">
                        <FormControl className="mt-2">
                          <div className="flex items-center">
                            <label className="mr-2">USD</label>
                            <input
                              type="number"
                              min={1}
                              placeholder="Price"
                              className="w-20 p-2 border-input rounded bg-background"
                              {...field}
                            />
                            <FormLabel className="ml-2">/ night</FormLabel>
                          </div>
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mt-6 flex justify-between">
                {property ? (
                  <Button className="max-w-[150px]" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      <>
                        <PencilLine className="mr-2 h-4 w-4" />
                        Update
                      </>
                    )}
                  </Button>
                ) : (
                  <Button className="max-w-[150px]" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      <>
                        <PencilLine className="mr-2 h-4 w-4" />
                        Create
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default AddPropertyForm

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { formSchema } from "@/lib/validations";
import { useMutation } from "@tanstack/react-query";
import { postNewEarthQuakeData } from "@/services/postAPI";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useNavigate } from "react-router-dom";

interface City {
  name: string;
  location: {
    latitude: number;
    longitude: number;
  };
  recentEarthquakes: {
    date: string;
    magnitude: number;
    depth: number;
  }[];
}

const RightSideBar = () => {
  const data = useSelector((state: RootState) => state.postData.postNewData); // Redux'dan alınan veri
  console.log("data", data);

  const navigate = useNavigate();

  const { mutate } = useMutation<
    void, // Dönen veri tipi
    unknown, // Hata tipi
    {
      cities: City[];
      country: {
        name: string;
        avarageLocation: { latitude: number; longitude: number };
      };
    } // mutate fonksiyonuna gönderilen veri tipi
  >({
    mutationFn: (data) => postNewEarthQuakeData(data),
    onSuccess: () => {
      navigate("/");
    },
  });

  const { setValue, ...form } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cityName: "",
      latitude: "0",
      longitude: "0",
      recentEarthquakes: [{ date: "", magnitude: "0", depth: "0" }],
      countryName: "",
    },
  });

  // Redux store'dan gelen veriyi izleyerek formu güncelle
  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      setValue("cityName", data.features[0].properties.county || "");
      setValue("countryName", data.features[0].properties.country || "");
      setValue("latitude", data.query.lat ? data.query.lat.toString() : "0");
      setValue("longitude", data.query.lon ? data.query.lon.toString() : "0");

      if (data.recentEarthquakes && data.recentEarthquakes.length > 0) {
        setValue(
          "recentEarthquakes.0.date",
          data.recentEarthquakes[0].date || ""
        );
        setValue(
          "recentEarthquakes.0.magnitude",
          data.recentEarthquakes[0].magnitude
            ? data.recentEarthquakes[0].magnitude.toString()
            : "0"
        );
        setValue(
          "recentEarthquakes.0.depth",
          data.recentEarthquakes[0].depth
            ? data.recentEarthquakes[0].depth.toString()
            : "0"
        );
      }
    }
  }, [data, setValue]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    const cities = [
      {
        name: values.cityName, // Şehir adı
        location: {
          latitude: parseFloat(values.latitude), // Enlem
          longitude: parseFloat(values.longitude), // Boylam
        },
        recentEarthquakes: values.recentEarthquakes.map((eq) => ({
          date: eq.date,
          magnitude: parseFloat(eq.magnitude),
          depth: parseFloat(eq.depth),
        })),
      },
    ];

    // API'ye gönderilecek veri formatı
    const dataToSend = {
      cities,
      country: {
        name: values.countryName,
        averageLocation: {
          // avarageLocation yerine averageLocation kullanın
          latitude: parseFloat(values.latitude),
          longitude: parseFloat(values.longitude),
        },
      },
    };

    console.log("dataToSend", dataToSend);
    mutate(dataToSend);
  }

  return (
    <div className="h-fit bg-white w-[300px] flex flex-col items-center justify-center p-8 gap-14 absolute top-1/2 -translate-y-1/2 right-5 rounded-lg max-sm:hidden">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="cityName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City Name</FormLabel>
                <FormControl>
                  <Input placeholder="Madrid" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="latitude"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Latitude</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="40.4168" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="longitude"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Longitude</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="-3.7038" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="recentEarthquakes.0.date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Recent Earthquake Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="recentEarthquakes.0.magnitude"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Magnitude</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.1"
                    placeholder="4.2"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="recentEarthquakes.0.depth"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Depth</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="15" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="countryName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country Name</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Spain" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default RightSideBar;

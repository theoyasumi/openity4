"use client";

import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Select from "react-select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ResizableEditor } from "@/components/editor/ResizableEditor";
import { citySchema, type CityFormData } from "@/lib/validations/city";
import { type City } from "@/lib/types/city";
import { getAllCities } from "@/lib/services/cities";
import "react-quill/dist/quill.snow.css";

interface CityFormProps {
  initialData?: City;
  onSubmit: (data: CityFormData) => Promise<void>;
  onCancel: () => void;
  isSubmitting: boolean;
}

export function CityForm({
  initialData,
  onSubmit,
  onCancel,
  isSubmitting,
}: CityFormProps) {
  const [cities, setCities] = useState<Array<{ value: string; label: string }>>([]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const citiesData = await getAllCities();
        setCities(
          citiesData.map((city) => ({
            value: city.id,
            label: city.data.name,
          }))
        );
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    fetchCities();
  }, []);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CityFormData>({
    resolver: zodResolver(citySchema),
    defaultValues: initialData || {
      metaTitle: "",
      metaDescription: "",
      imageUrl: "",
      imageAlt: "",
      name: "",
      introduction: "",
      mainContent: "",
      count: "",
      linkedCities: [],
      showInMenu: false,
      content: {
        services: [],
        prices: [],
        testimonial: { text: "", author: "" },
      },
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
      <Tabs defaultValue="seo" className="w-full">
        <TabsList className="grid w-full grid-cols-2 sticky top-0 bg-background z-10">
          <TabsTrigger value="seo">SEO</TabsTrigger>
          <TabsTrigger value="content">Contenu</TabsTrigger>
        </TabsList>

        <TabsContent value="seo" className="space-y-4">
          <div>
            <Label htmlFor="metaTitle">Titre Meta</Label>
            <Input
              id="metaTitle"
              {...register("metaTitle")}
              className="mt-1"
            />
            {errors.metaTitle && (
              <p className="text-sm text-destructive mt-1">
                {errors.metaTitle.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="metaDescription">Description Meta</Label>
            <Textarea
              id="metaDescription"
              {...register("metaDescription")}
              className="mt-1"
              rows={3}
            />
            {errors.metaDescription && (
              <p className="text-sm text-destructive mt-1">
                {errors.metaDescription.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="imageUrl">URL de l'image</Label>
            <Input
              id="imageUrl"
              {...register("imageUrl")}
              className="mt-1"
            />
            {errors.imageUrl && (
              <p className="text-sm text-destructive mt-1">
                {errors.imageUrl.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="imageAlt">Texte alternatif de l'image</Label>
            <Input
              id="imageAlt"
              {...register("imageAlt")}
              className="mt-1"
            />
            {errors.imageAlt && (
              <p className="text-sm text-destructive mt-1">
                {errors.imageAlt.message}
              </p>
            )}
          </div>
        </TabsContent>

        <TabsContent value="content" className="space-y-4">
          <div>
            <Label htmlFor="name">Nom de la ville</Label>
            <Input
              id="name"
              {...register("name")}
              className="mt-1"
            />
            {errors.name && (
              <p className="text-sm text-destructive mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="introduction">Introduction</Label>
            <Textarea
              id="introduction"
              {...register("introduction")}
              className="mt-1"
              rows={3}
            />
            {errors.introduction && (
              <p className="text-sm text-destructive mt-1">
                {errors.introduction.message}
              </p>
            )}
          </div>

          <div>
            <Label>Contenu principal</Label>
            <div className="mt-1">
              <Controller
                name="mainContent"
                control={control}
                render={({ field }) => (
                  <ResizableEditor
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
            {errors.mainContent && (
              <p className="text-sm text-destructive mt-1">
                {errors.mainContent.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="count">Nombre de serruriers</Label>
            <Input
              id="count"
              {...register("count")}
              className="mt-1"
            />
            {errors.count && (
              <p className="text-sm text-destructive mt-1">
                {errors.count.message}
              </p>
            )}
          </div>

          <div>
            <Label>Villes liées</Label>
            <Controller
              name="linkedCities"
              control={control}
              render={({ field: { onChange, value, ...field } }) => (
                <Select
                  {...field}
                  isMulti
                  options={cities}
                  value={cities.filter(option => value?.includes(option.value))}
                  onChange={(newValue) => onChange(newValue.map(v => v.value))}
                  className="mt-1"
                  classNamePrefix="select"
                  placeholder="Sélectionnez les villes liées..."
                />
              )}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Controller
              name="showInMenu"
              control={control}
              render={({ field }) => (
                <Switch
                  id="showInMenu"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
            <Label htmlFor="showInMenu">Afficher dans le menu</Label>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-4 pt-4 sticky bottom-0 bg-background pb-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Annuler
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Enregistrement..." : "Enregistrer"}
        </Button>
      </div>
    </form>
  );
}
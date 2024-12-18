"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React, { useActionState, useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "@/components/ui";
import { Send } from "lucide-react";
import { startupSchema, StartupSchema } from "../../validations/create";

import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { createStartup } from "@/lib/actions";
import { objectToFormData } from "@/lib/utils";

const StartupForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<StartupSchema>({
    resolver: zodResolver(startupSchema),
  });
  const { toast } = useToast();
  const router = useRouter();

  const onSubmit: SubmitHandler<StartupSchema> = async (data) => {
    try {
      // Converter os dados do formulário para FormData
      const formData = objectToFormData(data);

      // Chamada à API com FormData
      const response = await createStartup(formData);
      if (response.status === "SUCCESS") {
        toast({
          variant: "default",
          title: "Success",
          description: "Your startup has been submitted successfully.",
        });
        console.log(response);
        router.push(`/startup/${response._id}`);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="startup-form">
      <div>
        <label htmlFor="title" className="startup-form_label">
          Title
        </label>
        <Input
          id={"title"}
          {...register("title")}
          className="startup-form_input"
          required
          placeholder="Startup Name"
          disabled={isSubmitting}
        />
        {errors.title?.message && (
          <p className="startup-form_error">{errors.title?.message}</p>
        )}
      </div>
      <div>
        <label htmlFor="description" className="startup-form_label">
          Description
        </label>
        <Textarea
          id={"description"}
          {...register("description")}
          className="startup-form_textarea"
          required
          placeholder="Startup Description"
          disabled={isSubmitting}
        />
        {errors.description?.message && (
          <p className="startup-form_error">{errors.description?.message}</p>
        )}
      </div>
      <div>
        <label htmlFor="category" className="startup-form_label">
          Category
        </label>
        <Input
          id={"category"}
          {...register("category")}
          className="startup-form_input"
          required
          placeholder="Startup Category (Tech, Health, Education, etc.)"
          disabled={isSubmitting}
        />
        {errors.category?.message && <p>{errors.category?.message}</p>}
      </div>
      <div>
        <label htmlFor="link" className="startup-form_label">
          Image URL
        </label>
        <Input
          id={"link"}
          {...register("link")}
          className="startup-form_input"
          required
          placeholder="Startup Image URL"
          disabled={isSubmitting}
        />
        {errors.link?.message && (
          <p className="startup-form_error">{errors.link?.message}</p>
        )}
      </div>
      <div data-color-mode="light">
        <label htmlFor="pitch" className="startup-form_label">
          Title
        </label>
        <Controller
          name="pitch"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <MDEditor
              value={field.value}
              onChange={(value) => field.onChange(value)}
              preview="edit"
              height={300}
              style={{
                borderRadius: "20",
                overflow: "hidden",
              }}
              textareaProps={{
                placeholder:
                  "Briefly describe your idea and what problem it solves",
              }}
              previewOptions={{
                disallowedElements: ["style"],
              }}
            />
          )}
        />
        {errors.pitch?.message && (
          <p className="startup-form_error">{errors.pitch?.message}</p>
        )}
      </div>
      <Button
        type="submit"
        className="startup-form_btn text-white-100"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting" : "Submit Your Pitch"}
        <Send className="size-6 ml-2" />
      </Button>
    </form>
  );
};

export default StartupForm;

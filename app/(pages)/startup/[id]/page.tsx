import React, { Suspense } from "react";

import { HeroSection } from "@/components/HeroSection/HeroSection";

import { formatDate } from "@/lib/utils";
import { client } from "@/sanity/lib/client";

import { STARTUP_BY_ID_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import Link from "next/link";
import { StartupType } from "@/components/StartupCard/StartupCard";
import Image from "next/image";

import markdownit from "markdown-it";
import { Skeleton } from "@/components/ui/skeleton";
import Views from "@/components/Views/Views";

export const experimental_ppr = true;

type StartupProps = {
  params: Promise<{ id: string }>;
};

const md = markdownit();

const Page = async ({ params }: StartupProps) => {
  const id = (await params).id;

  const startup: StartupType = await client.fetch(STARTUP_BY_ID_QUERY, {
    id,
  });

  if (!startup) return notFound();

  const parsedContent = md.render(startup.pitch || "");

  return (
    <>
      <HeroSection
        highlightText={formatDate(startup._createdAt)}
        headingText={startup.title ?? ""}
      >
        <p className="sub-heading !max-w-3xl fade-in-bottom-500">
          {startup.description}
        </p>
      </HeroSection>
      <section className="section_container">
        <img
          src={startup.image}
          alt="thumbnail"
          className="w-full h-auto rounded-xl fade-in"
        />
        <div className="space-y-5 mt-10 max-x-4xl mx-auto">
          <div className="flex-between gap-5">
            <Link
              href={`/user/${startup.author?.id}`}
              className="flex gap-2 items-center mb-3"
            >
              <Image
                src={startup.author?.image as string}
                className="rounded-full drop-shadow-lg"
                width={64}
                height={64}
                alt="avatar"
                loading="lazy"
              />
              <div>
                <p className="text-20-medium">{startup.author?.name}</p>
                <p className="text-16-medium !text-black-300">
                  @{startup.author?.username}
                </p>
              </div>
            </Link>
            <p className="category-tag">{startup.category}</p>
          </div>
          <h3 className="text-30-bold">Startup Details</h3>
          {parsedContent ? (
            <article
              className="prose max-w-4xl font-work-sans break-all"
              dangerouslySetInnerHTML={{
                __html: parsedContent,
              }}
            />
          ) : (
            <p className="no results">No details provided</p>
          )}
        </div>
        <hr className="divider" />
      </section>
      <Suspense fallback={<Skeleton className="view_skeleton" />}>
        <Views id={id} />
      </Suspense>
    </>
  );
};

export default Page;

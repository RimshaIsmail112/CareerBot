'use client'
import {cn} from "@/lib/utils";
import React from "react";
import {BentoGrid, BentoGridItem} from "../ui/bento-grid";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";


import {Card, CardContent} from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import {displayContent} from "next/dist/client/dev/fouc";
import {JobsFilter} from "@/components/dashboardComponents/JobsFilter";

export default function JobsSection() {
    const [active, setActive] = React.useState(1);
    const getItemProps = (index) =>
        ({
            variant: active === index ? "filled" : "text",
            color: "gray",
            onClick: () => setActive(index),
        });

    const next = () => {
        if (active === 5) return;

        setActive(active + 1);
    };

    const prev = () => {
        if (active === 1) return;

        setActive(active - 1);
    };
    return (
        <div className={'w-screen px-16'}>
            <h2 className={cn('text-3xl font-bold text-neutral-900 dark:text-neutral-100', 'mt-10 mb-4')}>Recommended
                Jobs
            </h2>
            <Carousel
                opts={{
                    align: "start",
                }}
                className="w-full"
            >
                <CarouselContent>
                    {items.map((item, index) => (
                        <CarouselItem key={index} className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                            <div className="p-1">
                                <BentoGridItem
                                    title={item.title}
                                    description={item.description}
                                    header={item.header}
                                    className={"cursor-pointer"}/>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious/>
                <CarouselNext/>
            </Carousel>

            <div className={'flex flex-col gap-3'}>
                <h2 className={cn('text-3xl font-bold text-neutral-900 dark:text-neutral-100', 'mt-10 mb-4')}>All Jobs
                </h2>
                <div className='flex flex-col lg:flex-row gap-3'>
                    <JobsFilter/>
                    <div className={'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 justify-center items-center'}>
                        {items.map((item, i) => (
                            <BentoGridItem
                                key={i}
                                title={item.title}
                                description={item.description}
                                header={item.header}
                                icon={item.icon}
                                className={"cursor-pointer"}
                            />
                        ))}
                    </div>
                </div>
                <div className="flex items-center justify-center gap-4 mt-5">
                    <Button
                        variant="text"
                        className="flex items-center gap-2"
                        onClick={prev}
                        disabled={active === 1}
                    >
                        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4"/> Previous
                    </Button>
                    <div className="flex items-center gap-2">
                        <IconButton {...getItemProps(1)}>1</IconButton>
                        <IconButton {...getItemProps(2)}>2</IconButton>
                        <IconButton {...getItemProps(3)}>3</IconButton>
                        <IconButton {...getItemProps(4)}>4</IconButton>
                        <IconButton {...getItemProps(5)}>5</IconButton>
                    </div>
                    <Button
                        variant="text"
                        className="flex items-center gap-2"
                        onClick={next}
                        disabled={active === 5}
                    >
                        Next
                        <ArrowRightIcon strokeWidth={2} className="h-4 w-4"/>
                    </Button>
                </div>
            </div>
        </div>
    )
}


const Skeleton = () => (
    <div
        className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
);

const items = [
    {
        title: "The Dawn of Innovation",
        description: "Explore the birth of groundbreaking ideas and inventions.",
        header: <Skeleton/>,
    },
    {
        title: "The Digital Revolution",
        description: "Dive into the transformative power of technology.",
        header: <Skeleton/>,
    },
    {
        title: "The Art of Design",
        description: "Discover the beauty of thoughtful and functional design.",
        header: <Skeleton/>,
    },
    {
        title: "The Art of Design",
        description: "Discover the beauty of thoughtful and functional design.",
        header: <Skeleton/>,
    },
    {
        title: "The Dawn of Innovation",
        description: "Explore the birth of groundbreaking ideas and inventions.",
        header: <Skeleton/>,
    },
    {
        title: "The Digital Revolution",
        description: "Dive into the transformative power of technology.",
        header: <Skeleton/>,
    },

];

import { Button } from '@/components/ui/button';
import React from 'react';
import { Link } from 'react-router-dom';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import companies from "../data/companies.json";
import faqs from "../data/faq.json";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"


const Landing: React.FC = () => {
    return (
        <div className="flex flex-col gap-10 sm:gap-20 py-10 sm:py-20">


            <section className="text-center ">
                <h1 className="flex flex-col items-center justify-center gradient-title font-extrabold text-4xl sm:text-6xl lg:text-8xl tracking-tighter py-4">
                    Find Your Dream Job
                    <span className="flex items-center gap-2 sm:gap-6">
                        with
                        <img
                            src="/assets/images/hire.png"
                            className="h-14 sm:h-24 lg:h-32"
                            alt="Hirrd Logo"
                        />
                    </span>
                </h1>
                <p className="text-gray-300 sm:mt-4 text-xs sm:text-xl">
                    Explore thousands of job listings or find the perfect candidate
                </p>
            </section>

            <div className="flex gap-6 mt-8 justify-center">
                <Link to={"/jobs"}>
                    <Button variant="blue" size='xl'>
                        Find Jobs
                    </Button>
                </Link>

                <Link to={"/post-job"}>
                    <Button variant="destructive" size="xl">
                        Post a Job
                    </Button>
                </Link>

            </div>

            <Carousel
                plugins={[
                    Autoplay({
                        delay: 2000,
                    }),
                ]}
                className="w-full py-10 px-14 sm:px-7"
            >
                <CarouselContent className="flex gap-5 sm:gap-20 items-center">
                    {companies.map(({ name, id, path }) => (
                        <CarouselItem key={id} className="basis-1/3 lg:basis-1/6 ">
                            <img
                                src={path}
                                alt={name}
                                className="h-9 sm:h-14 object-contain"
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>

            <img src="/assets/images/banner.jpeg" className="w-full px-14 sm:px-7" />

            <section className="grid grid-cols-1 md:grid-cols-2 gap-4 px-5">
                <Card>
                    <CardHeader>
                        <CardTitle className="font-bold">For Job Seekers</CardTitle>
                    </CardHeader>
                    <CardContent>
                        Search and apply for jobs, track applications, and more.
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="font-bold">For Employers</CardTitle>
                    </CardHeader>
                    <CardContent>
                        Post jobs, manage applications, and find the best candidates.
                    </CardContent>
                </Card>
            </section>

            <section className='px-5'>
                <Accordion type="multiple" className="w-full">
                    {faqs.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index + 1}`}>
                            <AccordionTrigger>{faq.question}</AccordionTrigger>
                            <AccordionContent>{faq.answer}</AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </section>

        </div>
    );
};

export default Landing;
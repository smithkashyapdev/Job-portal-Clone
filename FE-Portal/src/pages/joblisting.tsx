import React, { useMemo } from 'react';
import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { State } from "country-state-city";
import { BarLoader } from "react-spinners";

import JobCard, { JobCardProps, JobProps } from "../components/job-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import compArray  from "../data/companies.json";

const JobListing: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [location, setLocation] = useState("");
    const [company_id, setCompany_id] = useState("");
    const [loadingJobs, setLoadingJobs] = useState(false);
    const [companies, setCompanies] = useState([]);
    const [jobs, setJobs] = useState<JobProps[]>([]);

    const { isLoaded } = useUser();
    useEffect(() => {
        // Fetch companies data here and set it to state
        const fetchCompanies = async () => {
            // Replace with your API call
            setCompanies(compArray);
        };

        fetchCompanies();
    }, []);

    const list =  useMemo(() => {
        return  jobs.filter((job) => {
            if (searchQuery && !job.title.toLowerCase().includes(searchQuery.toLowerCase()))
                return false;
            return true;
        });
    }, [searchQuery, jobs]);

    console.log(list);

    useEffect(() => {
        let count = 0;
        let array  = [] as JobProps[];
        while (count < 8) {
            const orgnisation = compArray[Math.floor(Math.random() * companies.length)];
            const job: JobProps = {
                id: orgnisation.id.toString(),
                title: "Software Engineer $",
                company: { logo_url: orgnisation.path},
                location: "Bangalore",
                description:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed etiam, si coactum est, non resistere.",

            } as JobProps;
            count++;
            array.push(job);
        }
        setJobs(array);
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        let formData = new FormData(e.target);

        const query = formData.get("search-query");
        if (query) setSearchQuery(query);
    };

    const clearFilters = () => {
        setSearchQuery("");
        setCompany_id("");
        setLocation("");
    };

    return (
        <div className="px-4">
            <h1 className="gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8">
                Latest Jobs
            </h1>
            <form
                onSubmit={handleSearch}
                className="h-14 flex flex-row w-full gap-2 items-center mb-3"
            >
                <Input
                    type="text"
                    placeholder="Search Jobs by Title.."
                    name="search-query"
                    className="h-full flex-1  px-4 text-md"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button type="submit" className="h-full sm:w-28" variant="blue">
                    Search
                </Button>
            </form>

            <div className="flex flex-col sm:flex-row gap-2">
                <Select value={location} onValueChange={(value) => setLocation(value)}>
                    <SelectTrigger>
                        <SelectValue placeholder="Filter by Location" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {State.getStatesOfCountry("IN").map(({ name }) => {
                                return (
                                    <SelectItem key={name} value={name}>
                                        {name}
                                    </SelectItem>
                                );
                            })}
                        </SelectGroup>
                    </SelectContent>
                </Select>

                <Select
                    value={company_id}
                    onValueChange={(value) => setCompany_id(value)}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Filter by Company" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {companies?.map(({ name, id }) => {
                                return (
                                    <SelectItem key={name} value={id}>
                                        {name}
                                    </SelectItem>
                                );
                            })}
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <Button
                    className="sm:w-1/2"
                    variant="destructive"
                    onClick={clearFilters}
                >
                    Clear Filters
                </Button>
            </div>

            {loadingJobs && (
                <BarLoader className="mt-4" width={"100%"} color="#36d7b7" />
            )}

            {loadingJobs === false && (
                <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {list?.length ? (
                        list.map((job) => {
                            return (
                                <JobCard
                                    key={job.id}
                                    job={job}
                                    savedInit={job?.saved?.length > 0}
                                />
                            );
                        })
                    ) : (
                        <div>No Jobs Found 😢</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default JobListing;
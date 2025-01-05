import { useUser } from '@clerk/clerk-react';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { useEffect } from "react";
import { BarLoader } from "react-spinners";
import MDEditor from "@uiw/react-md-editor";
import { Briefcase, DoorClosed, DoorOpen, MapPinIcon } from "lucide-react";
import { JobProps } from '@/components/job-card';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@radix-ui/react-select';
import { ApplyJobDrawer } from '@/components/apply-job';
import ApplicationCard from '@/components/application-card';

export interface JobDetailsProps {
    recruiter_id: string;
    title: string;
    description: string;
    requirements: string;
    location: string;
    isOpen: boolean;
    company: { logo_url: string };
    applications: any[];

}

const Job: React.FC = () => {
    const { id } = useParams();
    const { isLoaded, user } = useUser();

    const [job, setJob] = useState<JobDetailsProps>(
        {
            "recruiter_id": "recruiter123",
            "title": "Software Engineer",
            "description": "We are looking for a skilled Software Engineer to join our team and help us build scalable and efficient software solutions.",
            "requirements": "Bachelor's degree in Computer Science or related field, 3+ years of experience in software development, proficiency in JavaScript, Python, and cloud technologies.",
            "location": "San Francisco, CA",
            "isOpen": true,
            "company": {
                "logo_url": "https://example.com/logo.png"
            },
            "applications": [
                {
                    "applicant_id": "applicant456",
                    "name": "John Doe",
                    "email": "johndoe@example.com",
                    "resume_url": "https://example.com/resume.pdf",
                    "status": "Under Review"
                },
                {
                    "applicant_id": "applicant789",
                    "name": "Jane Smith",
                    "email": "janesmith@example.com",
                    "resume_url": "https://example.com/resume.pdf",
                    "status": "Interview Scheduled"
                }
            ]
        }

    );
    const [loadingHiringStatus, setLoadingHiringStatus] = useState(false);

    const fnJob = () => {
        // Define the function logic here
    };

    const handleStatusChange = (value) => {
        const isOpen = value === "open";

    };

    return (
        <div className="flex flex-col gap-8 mt-5 px-5">
            <div className="flex flex-col-reverse gap-6 md:flex-row justify-between items-center">
                <h1 className="gradient-title font-extrabold pb-3 text-4xl sm:text-6xl">
                    {job?.title}
                </h1>
                <img src={job?.company?.logo_url} className="h-12" alt={job?.title} />
            </div>

            <div className="flex justify-between ">
                <div className="flex gap-2">
                    <MapPinIcon /> {job?.location}
                </div>
                <div className="flex gap-2">
                    <Briefcase /> {job?.applications?.length} Applicants
                </div>
                <div className="flex gap-2">
                    {job?.isOpen ? (
                        <>
                            <DoorOpen /> Open
                        </>
                    ) : (
                        <>
                            <DoorClosed /> Closed
                        </>
                    )}
                </div>
            </div>

            {job?.recruiter_id === user?.id && (
                <Select onValueChange={handleStatusChange}>
                    <SelectTrigger
                        className={`w-full ${job?.isOpen ? "bg-green-950" : "bg-red-950"}`}
                    >
                        <SelectValue
                            placeholder={
                                "Hiring Status " + (job?.isOpen ? "( Open )" : "( Closed )")
                            }
                        />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="open">Open</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                </Select>
            )}

            <h2 className="text-2xl sm:text-3xl font-bold">About the job</h2>
            <p className="sm:text-lg">{job?.description}</p>

            <h2 className="text-2xl sm:text-3xl font-bold">
                What we are looking for
            </h2>
            <MDEditor.Markdown
                source={job?.requirements}
                className="bg-transparent sm:text-lg" // add global ul styles - tutorial
            />
            {job?.recruiter_id !== user?.id && (
                <ApplyJobDrawer
                    job={job}
                    user={user}
                    fetchJob={fnJob}
                    applied={job?.applications?.find((ap) => ap.candidate_id === user.id)}
                />
            )}
            {loadingHiringStatus && <BarLoader width={"100%"} color="#36d7b7" />}
            {job?.applications?.length > 0 && job?.recruiter_id === user?.id && (
                <div className="flex flex-col gap-2">
                    <h2 className="font-bold mb-4 text-xl ml-1">Applications</h2>
                    {job?.applications.map((application) => {
                        return (
                            <ApplicationCard key={application.id} application={application} />
                        );
                    })}
                </div>
            )}
        </div>
    );


};

export default Job;
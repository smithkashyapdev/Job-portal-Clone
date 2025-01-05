import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
    SignedIn,
    SignedOut,
    UserButton,
    SignIn,
    useUser,
} from "@clerk/clerk-react";
import { Button } from "./ui/button";
import { BriefcaseBusiness, Heart, PenBox } from "lucide-react";

const Header = () => {
    const [showSignIn, setShowSignIn] = useState(false);

    const [search, setSearch] = useSearchParams();
    const { user } = useUser();

    return (
        <>
            <nav className="p-5 flex justify-between items-center">
                <Link to="/">
                    <img src="/assets/images/hire.png" className="w-16 h-16" alt="Hirrd Logo" />
                </Link>

                <div className="flex gap-8">
                    <SignedOut>
                        <Button variant="outline" onClick={() => setShowSignIn(true)}> Login </Button>
                    </SignedOut>
                    <SignedIn> {user?.unsafeMetadata?.role === "recruiter" && (
                        <Link to="/post-job">
                            <Button variant="destructive" className="rounded-full">
                                <PenBox size={20} className="mr-2" /> Post a Job
                            </Button>
                        </Link>)} <UserButton appearance={{
                            elements: {
                                avatarBox: "w-10 h-10",
                            },
                        }}>
                            <UserButton.MenuItems>
                                <UserButton.Link label="My Jobs" labelIcon={<BriefcaseBusiness size={15} />} href="/my-jobs" />
                                <UserButton.Link label="Saved Jobs" labelIcon={<Heart size={15} />} href="/saved-jobs" />
                                <UserButton.Action label="manageAccount" />
                            </UserButton.MenuItems>
                        </UserButton>
                    </SignedIn>
                </div>

            </nav>
        </>
    );
};

export default Header;
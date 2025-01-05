/* eslint-disable react/prop-types */
import React from "react";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { BarLoader } from "react-spinners";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const schema = z.object({
    name: z.string().min(1, { message: "Company name is required" }),
    logo: z
        .any()
        .refine(
            (file) =>
                file[0] &&
                (file[0].type === "image/png" || file[0].type === "image/jpeg"),
            {
                message: "Only Images are allowed",
            }
        ),
});

const AddCompanyDrawer = ({ fetchCompanies }) => {
    const [loadingAddCompany, setLoadingAddCompany] = useState(false);
    const [errorAddCompany, setErrorAddCompany] = useState(null);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
    });

    const onSubmit = async (data) => {

    };

    useEffect(() => {

    }, []);

    return (
        <Drawer>
            <DrawerTrigger>
                <Button type="button" size="sm" variant="secondary">
                    Add Company
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Add a New Company</DrawerTitle>
                </DrawerHeader>
                <form className="flex gap-2 p-4 pb-0">
                    {/* Company Name */}
                    <Input placeholder="Company name" {...register("name")} />

                    {/* Company Logo */}
                    <Input
                        type="file"
                        accept="image/*"
                        className=" file:text-gray-500"
                        {...register("logo")}
                    />

                    {/* Add Button */}
                    <Button
                        type="button"
                        onClick={handleSubmit(onSubmit)}
                        variant="destructive"
                        className="w-40"
                    >
                        Add
                    </Button>
                </form>
                <DrawerFooter>
                    {errors.name?.message && <p className="text-red-500">{String(errors.name.message)}</p>}
                    {errors.logo?.message && <p className="text-red-500">{String(errors.logo.message)}</p>}
                    {errorAddCompany?.message && (
                        <p className="text-red-500">{errorAddCompany?.message}</p>
                    )}
                    {loadingAddCompany && <BarLoader width={"100%"} color="#36d7b7" />}
                    <DrawerClose asChild>
                        <Button type="button" variant="secondary">
                            Cancel
                        </Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};

export default AddCompanyDrawer;
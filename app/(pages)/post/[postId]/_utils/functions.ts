import getPostById from "@/app/action/getPostById";
import { cache } from "react";

export const getCachedPostById = cache(getPostById);

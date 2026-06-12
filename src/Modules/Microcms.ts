import { createClient } from "microcms-js-sdk";

const rawServiceDomain = import.meta.env.VITE_MICROCMS_SERVICE_DOMAIN;
const apiKey = import.meta.env.VITE_MICROCMS_API_KEY;

function normalizeServiceDomain(domain: string): string {
    return domain.replace(/\.microcms\.io\/?$/, "");
}

const serviceDomain = rawServiceDomain ? normalizeServiceDomain(rawServiceDomain) : "";

if (!serviceDomain || !apiKey) {
    console.error(
        "microCMS の環境変数が未設定です。VITE_MICROCMS_SERVICE_DOMAIN と VITE_MICROCMS_API_KEY を設定してください。"
    );
}

const client = createClient({
    serviceDomain,
    apiKey: apiKey ?? "",
});

export type MicroCmsMedia = {
    url: string;
    height?: number;
    width?: number;
};

export type Setting = {
    novis_x: string;
    novis_instagram: string;
    novis_youtube: string;
    pv_url: string;
    about: string;
    studio_join?: string;
    studio_price?: string;
    place_img?: MicroCmsMedia;
    place_logo?: MicroCmsMedia;
    place_name?: string;
    place_url?: string;
    place_address?: string;
    place_access?: string;
    place_map_iframe?: string;
    privacy_policy: string;
};

export type Instructor = {
    id: string;
    name: string;
    img: MicroCmsMedia;
    description: string;
    sns_x?: string;
    sns_instagram?: string;
    sns_youtube?: string;
    website?: string;
};

export type Course = {
    id: string;
    name?: string;
    instructor?: Instructor;
    description?: string;
};

export type Plan = {
    id: string;
    name: string;
    price: number;
    course?: Course;
};

export type QandAItem = {
    question: string;
    answer: string;
};

export type InstructorView = {
    name: string;
    imgPath: string;
    description: string;
    sns_x?: string;
    sns_instagram?: string;
    sns_youtube?: string;
    website?: string;
};

export type CourseView = {
    id: string;
    name: string;
    description: string;
    plans: Array<{ text: string; price: number }>;
};

export type PlaceView = {
    imgUrl?: string;
    logoUrl?: string;
    name?: string;
    url?: string;
    address?: string;
    access?: string;
    mapIframeSrc?: string;
};

export type SnsView = {
    x?: string;
    instagram?: string;
    youtube?: string;
};

export type StudioFeeView = {
    text: string;
    price: number;
};

export async function fetchSetting(): Promise<Setting | null> {
    const data = await client.get<Setting>({ endpoint: "setting" });
    return data ?? null;
}

export async function fetchInstructors(): Promise<InstructorView[]> {
    const data = await client.get<{ contents: Instructor[] }>({ endpoint: "instructor" });
    return data.contents.map((instructor) => ({
        name: instructor.name,
        imgPath: instructor.img.url,
        description: instructor.description,
        sns_x: instructor.sns_x,
        sns_instagram: instructor.sns_instagram,
        sns_youtube: instructor.sns_youtube,
        website: instructor.website,
    }));
}

export async function fetchCourses(): Promise<Course[]> {
    const data = await client.get<{ contents: Course[] }>({
        endpoint: "course",
        queries: { depth: 1 },
    });
    return data.contents;
}

export async function fetchPlans(): Promise<Plan[]> {
    const data = await client.get<{ contents: Plan[] }>({
        endpoint: "plan",
        queries: { depth: 2 },
    });
    return data.contents;
}

export async function fetchQandA(): Promise<QandAItem[]> {
    const data = await client.get<{ contents: QandAItem[] }>({ endpoint: "qanda" });
    return data.contents;
}

export function buildCourseViews(courses: Course[], plans: Plan[]): CourseView[] {
    const plansByCourseId = new Map<string, Array<{ text: string; price: number }>>();

    plans.forEach((plan) => {
        const courseId = plan.course?.id;
        if (!courseId) return;
        if (!plansByCourseId.has(courseId)) plansByCourseId.set(courseId, []);
        plansByCourseId.get(courseId)!.push({
            text: plan.name,
            price: plan.price,
        });
    });

    return courses.map((course) => {
        const instructorName = course.instructor?.name ?? "";
        const courseName = course.name || instructorName;
        return {
            id: instructorName || course.id,
            name: courseName,
            description: course.description ?? "",
            plans: plansByCourseId.get(course.id) ?? [],
        };
    });
}

export function buildPlaceView(setting: Setting): PlaceView {
    return {
        imgUrl: setting.place_img?.url,
        logoUrl: setting.place_logo?.url,
        name: setting.place_name,
        url: setting.place_url,
        address: setting.place_address,
        access: setting.place_access,
        mapIframeSrc: setting.place_map_iframe,
    };
}

export function buildSnsView(setting: Setting): SnsView {
    return {
        x: setting.novis_x,
        instagram: setting.novis_instagram,
        youtube: setting.novis_youtube,
    };
}

export function buildStudioFee(text: string | undefined, defaultText: string, defaultPrice: number): StudioFeeView {
    const parsed = text ? parseInt(text.replace(/[^\d]/g, ""), 10) : NaN;
    return {
        text: defaultText,
        price: Number.isNaN(parsed) ? defaultPrice : parsed,
    };
}

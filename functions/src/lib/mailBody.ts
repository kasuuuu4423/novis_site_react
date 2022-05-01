type FormPayload = {
    name: string;
    email: string;
    content?: string;
    age?: string,
    instructor?: string,
    plan?: string,
};
export const adminMailBodyContact = (params: FormPayload) => {
    return `
        以下内容でコンタクトフォームよりお問い合わせを受けつけました。
        お名前:
        ${params.name}
        メールアドレス:
        ${params.email}
        内容:
        ${params.content}
    `;
};
export const adminMailBodyApply = (params: FormPayload) => {
    return `
        以下内容でコンタクトフォームより申し込みを受けつけました。
        お名前:
        ${params.name}
        メールアドレス:
        ${params.email}
        年齢:
        ${params.age}
        講師:
        ${params.instructor}
        希望コース:
        ${params.plan}
    `;
};
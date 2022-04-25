const sizes = {
    sm: "540px",
    md: "720px",
    lg: "960px",
    xl: "1140px",
};

const Mixin = {
    media: (size: string, props: string)=>{
        return '@media screen and (min-width:' + sizes[size] + '){'+
            props
        +'}';
    },
};

export default Mixin;
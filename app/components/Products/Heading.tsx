interface HeadingProps {
    title: string;
    center?: boolean;
}

const Heading:React.FC<HeadingProps> = ({title, center}) => {
    return(
        <div className={center? "text-center" : "text-start"}>
            <h2 className="font-bold text-2xl">{title}</h2>

        </div>
    )
}
export default Heading;
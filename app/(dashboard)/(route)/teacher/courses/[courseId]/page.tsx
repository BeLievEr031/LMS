"use client"
interface ICourseIdProp {
    params: {
        courseId: string
    }
}

const CourseIdPage = ({ params }: ICourseIdProp) => {
    // console.log(params);


    return (<div>
        Course Id : {params.courseId}
    </div>);
}

export default CourseIdPage;
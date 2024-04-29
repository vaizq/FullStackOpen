
const Part = ({name, exercises}) => (
    <>
        <tr>
            <td>{name}</td>
            <td>{exercises}</td>
        </tr>
    </>
)


const Content = ({parts}) => {
    const total = parts.reduce((acc, part) => acc + part.exercises, 0)
    return (
        <>
        <table>
            <tbody>
                {parts.map((val) => 
                    <Part key={val.id} name={val.name} exercises={val.exercises} />
                )}
            </tbody>
        </table>
        <b>total of {total} exercises</b>
        </>
    )
}

const Header = ({name}) => (
    <>
        <h2>{name}</h2>
    </>
)


const Course = ({course}) => {
    return (
        <>
            <Header name={course.name} />
            <Content parts={course.parts} />
        </>
    )
}


export default Course
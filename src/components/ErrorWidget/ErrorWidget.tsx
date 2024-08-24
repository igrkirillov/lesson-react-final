export function ErrorWidget(props: {error: Error}) {
    const {error} = props;
    return (
        <div><span><b>Ошибка:</b> {error.message}</span></div>
    )
}
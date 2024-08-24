export function ErrorWidget(props: {error: Error | null}) {
    const {error} = props;
    return (
        <div><span><b>Ошибка:</b> {error?.message}</span></div>
    )
}
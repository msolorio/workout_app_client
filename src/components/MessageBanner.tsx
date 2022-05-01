import model from '../model'

function MessageBanner(): JSX.Element {
  const errorMessage: string = model.App.useGetErrorMessage()

  if (!errorMessage) return <></>

  return (
    <section className="mainBackground">
      <p className="description_small form-errorMessage">
        {errorMessage}
      </p>
    </section>
  )
}

export default MessageBanner

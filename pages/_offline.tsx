import Head from 'next/head'
import { Container, Text } from "@components/ui";
import { Bars } from "@components/icons";

export default function Offline() {
  return (
    <>
      <Head>
        <title>Offline fallback page</title>
      </Head>
      <Container className="p-12">
        <Text variant="pageHeading" className="text-center">You are offline</Text>
        <div className="flex-1 p-24 flex flex-col justify-center items-center ">
        <span
          className="border border-dashed border-secondary rounded-full flex items-center justify-center w-16 h-16 p-12 bg-primary text-primary">
          <Bars className="absolute"/>
        </span>
          <h2 className="pt-6 text-2xl font-bold tracking-wide text-center">
            No internet connection...
          </h2>
          <p className="text-accents-6 px-10 text-center pt-2">
            Please reconnect to the network to access the website. Click <a className="underline" href={'/'} onClick={() => location.reload()}>here</a> to try again!
          </p>
        </div>
      </Container>
    </>
  )
}

Offline.Layout = Offline

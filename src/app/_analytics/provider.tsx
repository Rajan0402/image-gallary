// app/providers.js
'use client'
import { useUser } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server'
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import { useEffect } from 'react'

if (typeof window !== 'undefined') {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: "/ingest",
    ui_host: 'https://us.posthog.com',
    person_profiles: 'always', // or 'always' to create profiles for anonymous users as well
  })
}
export function CSPostHogProvider({ children }: {children: React.ReactNode}) {
    return <PostHogProvider client={posthog}><PostHogAuthWrapper>{children}</PostHogAuthWrapper></PostHogProvider>
}

 export function PostHogAuthWrapper({children}: {children: React.ReactNode}) {
    const userInfo = useUser()

    useEffect(() => {
        if(userInfo.isSignedIn){
            posthog.identify(userInfo.user.id,{
                email: userInfo.user.emailAddresses[0]?.emailAddress,
                name: userInfo.user.fullName
            })
        } else if (!userInfo.isSignedIn){
            posthog.reset()
        }
    }, [userInfo])

    return children
 }
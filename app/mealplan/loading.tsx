import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const loading = () => {
    const array=new Array(4).fill(null)

  return (

    <div className='flex flex-col w-full p-2 space-y-2'>


        {
             array.map((_, idx) => (
                        <Card className='w-full' key={idx}>
                          <CardHeader>
                            
                            <Skeleton className='w-[200px] h-4'/>
                          </CardHeader>
                          <CardContent  className='space-y-2 w-full'>
                            <Skeleton className='w-[80vw]  h-4'/>
                            <Skeleton className='w-[80vw]  h-4'/>
                            <Skeleton className='w-[80vw]  h-4'/>
                            
                            
                          </CardContent>
                        </Card>  ))
        }
    </div>
  )}

export default loading
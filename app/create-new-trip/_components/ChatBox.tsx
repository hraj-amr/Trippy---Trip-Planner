'use client'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Loader, Send } from 'lucide-react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import EmptyBoxState from './EmptyBoxState'
import { v } from 'convex/values'
import GroupSizeUi from './GroupSizeUi'
import BudgetUi from './BudgetUi'
import FinalUi from './FinalUi'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { useTripDetail, useUserDetail } from '@/app/provider'
import { v4 as uuidv4 } from 'uuid'


export type TripInfo = {
    budget: string,
    destination: string,
    duration: string,
    group_size: string,
    origin: string,
    hotels: Hotel[],
    itinerary: Itinerary[]
}

export type Hotel = {
    hotel_name: string,
    hotel_address: string;
    price_per_night: string;
    hotel_image_url: string;
    geo_coordinates: {
        latitude: number;
        longitude: number;
    };    
    rating: number;
    description: string;
};

export type Activity = {
    place_name: string;
    place_details: string;
    place_image_url: string;
    geo_coordinates: {
        latitude: number;
        longitude: number;
    };
    place_address: string;
    ticket_pricing: string;
    time_travel_each_location: string;
    best_time_to_visit: string;
};

export type Itinerary = {
    day: number;
    day_plan: string;
    best_time_to_visit_day: string;
    activities: Activity [] ;
}

type Message = {
    role: string,
    content: string,
    ui?: string,
}

function ChatBox() {

    const [messages, setMessages] = useState<Message[]>([])
    const [userInput, setUserInput] = useState<string>('')
    const [loading, setLoading] = useState(false)
    // const [isFinal, setIsFinal] = useState(false)
    const [tripDetail, setTripDetail] = useState<TripInfo | null>(null)
    const SaveTripDetail = useMutation(api.tripDetail.CreateTripDetail)
    const {userDetail, setUserDetail} = useUserDetail()
    // @ts-ignore
    const {tripDetailInfo, setTripDetailInfo} = useTripDetail()

    const onSend = async (currentInput?: string) => {
        const textInput = currentInput || userInput;
        if (!textInput.trim()) return;

        setLoading(true);

        const newMsg: Message = {
            role: 'user',
            content: textInput
        };

        // 4. Create the *complete* next message list immediately
        const updatedMessages = [...messages, newMsg];
        setMessages(updatedMessages); // Update state right away
        setUserInput(''); // Clear input

        // 5. Determine if this should be the final API call based on the AI's LAST response
        const lastAiMessage = messages[messages.length - 1];
        const shouldBeFinal = lastAiMessage?.role === 'assistant' && lastAiMessage?.ui === 'final';

        try {
            const result = await axios.post('/api/aimodel', {
                // 6. Send the complete, updated message list and the calculated `isFinal` flag
                messages: updatedMessages,
                isFinal: shouldBeFinal
            });
            console.log("TRIP", result.data);

            // 7. Simplified response handling based on our `shouldBeFinal` variable
            if (shouldBeFinal) {
                const plan = result?.data?.trip_plan;
                setTripDetail(plan);
                setTripDetailInfo(plan);
                
                if (plan && userDetail?._id) {
                    const tripId = uuidv4();
                    await SaveTripDetail({
                        tripDetail: plan,
                        tripId: tripId,
                        uid: userDetail._id
                    });
                }
            } else {
                setMessages((prev: Message[]) => [...prev, {
                    role: 'assistant',
                    content: result?.data?.resp,
                    ui: result?.data?.ui
                }]);
            }
        } catch (error) {
            console.error("API Error:", error);
            // Optionally, add an error message to the chat
            setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, something went wrong. Please try again."}])
        } finally {
            setLoading(false);
        }
    };

    const RenderGenerativeUi = (ui:string) => {
        if(ui==='budget'){
            //Budget UI Component
            return <BudgetUi onSelectedOption={(v:string) => onSend()} />

        } else if(ui === 'groupSize'){
            // Group Size UI Component
            return <GroupSizeUi onSelectedOption={(v:string) => onSend()} />
        } else if(ui === 'final'){
            // Final UI Component
            return <FinalUi viewTrip={() => console.log()}
            disable={!tripDetail}
            />
        }
        return null
    }

  return (
    <div className='h-[80vh] flex flex-col border shadow rounded-2xl p-4'>
        {messages?.length==0 &&
        <EmptyBoxState onSelectOption={(v:string) => { setUserInput(v); onSend()}} />
        }

        {/* Display Messages */}
        <section className='flex-1 overflow-y-auto p-4'>
            {messages.map((msg:Message, index) => (
                msg.role == 'user' ? 
                <div className='flex justify-end mt-2' key={index}>
                    <div className='max-w-lg bg-primary text-white px-4 py-2 rounded-lg'>
                        {msg.content}
                    </div>
                </div> :
                <div className='flex justify-start mt-2' key={index}>
                    <div className='max-w-lg bg-gray-100 text-black px-4 py-2 rounded-lg'>
                        {msg.content}
                        {RenderGenerativeUi(msg.ui??'')}
                    </div>
                </div> 
            ))}
            {  loading &&  <div className='flex justify-start mt-2'>
                    <div className='max-w-lg bg-gray-100 text-black px-4 py-2 rounded-lg'>
                         <Loader className='animate-spin' />
                    </div>
                </div> }
        </section>
        {/* User Input */}
        <section>
            <div className='w-full max-w-3xl'>
            <div className='relative border rounded-2xl p-4'>
                <Textarea placeholder='Start typing here...'
                    className='w-full h-15 bg-transparent border-none focus-visible:ring-0 shadow-none resize-none'
                    onChange={(event) => setUserInput(event.target.value)}
                    value= {userInput}
                />
                <Button size={'icon'} className='absolute bottom-6 right-6' onClick={() => onSend()}>
                    <Send className='h-4 w-4'/>
                </Button>
            </div>
        </div>
        </section>
    </div>
  )
}

export default ChatBox
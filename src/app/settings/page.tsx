import { createClient } from "@/utils/supabase/client"
import react from "react"

const SettingsPage = async() => {
    const supabase = createClient()
    const signout = async()=> {
        await supabase.auth.signOut()
    }
    return <div>Settings<button onClick={()=>signout()}>Sign out</button></div>
}

export default SettingsPage
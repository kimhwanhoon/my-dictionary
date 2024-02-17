import { createClient } from "@/utils/supabase/client"
import react from "react"

const SettingsPage = async() => {
    const supabase = createClient()
    const signOut = async() => {
        await supabase.auth.signOut()
    }
    return (
    <div>
        Settings
        <button onClick={signOut}>
            Sign Out
        </button>
    </div>
    )
}

export default SettingsPage
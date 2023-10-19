"use client";
import { useRouter } from "next/navigation";
import toast from 'react-hot-toast';
import { Button } from "@nextui-org/button";

export default function DeleteButton({ id }: { id: string }) {
    const router = useRouter()
    const handleDelete = async () => {
        const isConfirmed = window.confirm('Are you sure you want to delete this routine?');
        
        if (!isConfirmed) {
            return;
        }
    
        try {
            const response = await fetch(`/api/routines/${id}`, {
                method: 'DELETE',
            });
    
            if (!response.ok) {
                throw new Error('Failed to delete the routine');
            }
    
            toast.success('Routine deleted successfully!');
            router.refresh();
        } catch (error) {
            console.error('There was an error deleting the routine:', error);
            toast.error('There was an error deleting the routine:');
        }
    }

    return (
        <Button size="sm" color="danger" onClick={handleDelete}>Delete</Button>
    )
}

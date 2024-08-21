import {useMutation, useQueryClient} from "@tanstack/react-query";
import addMedia from "@/app/db/addMedia";


const mutation = useMutation({
    mutationFn: addMedia,
    onSuccess: () => {
        console.log('Added')
    },
})

export default mutation
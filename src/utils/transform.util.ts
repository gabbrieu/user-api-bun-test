export const transformNumber = ({ params }: { params: { id: number } }) => {
    const id = +params.id;

    if (isNaN(id) === false) {
        params.id = id;
    }
};

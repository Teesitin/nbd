<script>
    import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
    import { Button } from 'flowbite-svelte';
    import { ArrowRightOutline, ShoppingCartSolid } from 'flowbite-svelte-icons';

</script>
  

<div class="w-full h-96 flex justify-center flex-col">

    <!-- Software Title -->
    <h1 class="text-5xl font-bold m-2 text-scorpion-50">
        <slot id="softwareTitle">
            Software Title
        </slot>
    </h1>

    <!-- Software Description -->
    <p class="text-1xl font-bold m-2 text-scorpion-50">
        <slot id="softwareDescription">
            Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance.
        </slot>
    </p>

</div>





<Table shadow hoverable={true}>
<TableHead>
    <TableHeadCell>Who Made It</TableHeadCell>
    <TableHeadCell>Rating</TableHeadCell>
    <TableHeadCell>TL;DR</TableHeadCell>
    <TableHeadCell>Link to Doc</TableHeadCell>

</TableHead>
<TableBody>
    <TableBodyRow>
        <TableBodyCell>Apple</TableBodyCell>
        <TableBodyCell>5.0</TableBodyCell>
        <TableBodyCell>Great Visuals. Easy Read.</TableBodyCell>
        <TableBodyCell><Button> <ArrowRightOutline></ArrowRightOutline> </Button></TableBodyCell>

    </TableBodyRow>
    <TableBodyRow>
        <TableBodyCell>Google</TableBodyCell>
        <TableBodyCell>4.8</TableBodyCell>
        <TableBodyCell>Fantastic GUI. Easy Navigation.</TableBodyCell>
        <TableBodyCell><Button> <ArrowRightOutline></ArrowRightOutline> </Button></TableBodyCell>

    </TableBodyRow>
    <TableBodyRow>
            <TableBodyCell>Microsoft</TableBodyCell>
            <TableBodyCell>3.2</TableBodyCell>
            <TableBodyCell>Rough Around the Visual Edges. Great in Detail.</TableBodyCell>
            <TableBodyCell><Button> <ArrowRightOutline></ArrowRightOutline> </Button></TableBodyCell>
    </TableBodyRow>
</TableBody>
</Table>
import React, {useState} from 'react';
import useToolbarStore from "@/features/editor/toolbar/stores/toolbar-store"
import {fabric} from "fabric";
import useMenuStore from "@/features/editor/sidebar/stores/sidebar-store";
import ShapeToolbarColor from "@/features/editor/toolbar/components/shape-toolbar-color"
const ShapeToolbar = () => {
    return (
        <ShapeToolbarColor />
    )
};


export default ShapeToolbar;

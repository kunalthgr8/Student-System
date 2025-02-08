import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchStudents = createAsyncThunk(
    "students/fetchStudents",
    async (filters) => {
        
        const cleanFilters = {
            searchQuery: filters?.searchQuery?.trim() || "",
            hostelFacility: filters?.hostelFacility || "",
            academicSession: filters?.academicSession || "",
            program: filters?.program || "",
            semester: filters?.semester || "",
            category: filters?.category || ""
        };
        
        const queryParams = new URLSearchParams(cleanFilters).toString();

        
        const response = await fetch(`http://localhost:8000/api/data/students/filtered?${queryParams}`);
        return await response.json();
    }
);

const studentsSlice = createSlice({
    name: "students",
    initialState: {
        studentsData: [],
        loading: false,
        error: null,
        filters: {
            searchQuery: "",
            hostelFacility: "",
            academicSession: "",
            program: "",
            semester: "",
            category: ""
        }
    },
    reducers: {
        updateSearchQuery: (state, action) => {
            state.filters.searchQuery = action.payload;
        },
        updateFilter: (state, action) => {
            const { name, value } = action.payload;
            state.filters[name] = value;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchStudents.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchStudents.fulfilled, (state, action) => {
                state.studentsData = action.payload;
                state.loading = false;
            })
            .addCase(fetchStudents.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            });
    }
});

export const { updateSearchQuery, updateFilter } = studentsSlice.actions;
export default studentsSlice.reducer;

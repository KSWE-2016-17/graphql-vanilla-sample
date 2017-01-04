import {
    graphql,
    GraphQLSchema,
    GraphQLNonNull,
    GraphQLList,
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
} from "graphql";

import { students, courses } from "./data";

const CourseType = new GraphQLObjectType({
    name: "Course",
    fields: {
        id: {
            type: new GraphQLNonNull(GraphQLInt),
            resolve: (value) => {
                return value.id;
            },
        },
        name: {
            type: new GraphQLNonNull(GraphQLString),
            resolve: (value) => {
                return value.name;
            },
        },
    },
});

const StudentType = new GraphQLObjectType({
    name: "Student",
    fields: {
        id: {
            type: new GraphQLNonNull(GraphQLInt),
            resolve: (value) => {
                return value.id;
            },
        },
        name: {
            type: new GraphQLNonNull(GraphQLString),
            resolve: (value) => {
                return value.name;
            },
        },
        matriculationNumber: {
            type: new GraphQLNonNull(GraphQLString),
            resolve: (value) => {
                return value.matriculationNumber;
            },
        },
        courses: {
            type: new GraphQLList(CourseType),
            resolve: (value) => {
                const result = [];

                value.courses.forEach((courseId) => {
                    courses.forEach((course) => {
                        if (course.id === courseId) {
                            result.push(course);
                        }
                    });
                });

                return result;
            },
        },
    },
});

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: "RootQueryType",
        fields: {
            students: {
                type: new GraphQLList(StudentType),
                resolve: () => {
                    return students;
                },
            },
            courses: {
                type: new GraphQLList(CourseType),
                resolve: () => {
                    return courses;
                },
            },
        },
    }),
    mutation: new GraphQLObjectType({
        name: "RootMutationType",
        fields: {
            deleteStudent: {
                type: StudentType,
                args: {
                    id: { type: new GraphQLNonNull(GraphQLInt) },
                },
                resolve: (value, args) => {
                    let foundStudent;

                    students.forEach((student) => {
                        if (student.id === args.id) {
                            foundStudent = student;

                            students.splice(students.indexOf(student), 1);
                        }
                    });

                    return foundStudent;
                },
            },
        },
    }),
});

export default schema;
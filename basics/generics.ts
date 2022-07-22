const addId = <T extends object>(obj: T) => {
    const id = Math.random().toString(16);
    return {
        ...obj,
        id,
    }
}

interface UserInterface<T> {
    name: string;
    data: T;
}

const userData: UserInterface<{meta: string}> = {
    name: "Arvind",
    data: {
        meta: 'foo',
    },
};

const userData1: UserInterface<string[]> = {
    name: "John",
    data: ["foo", "bar"]
}

const result = addId<UserInterface>(userData);
console.log("result", result)
class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.map = new Map();  // user's given <Key> : <Node Address>
        this.head = null;
        this.tail = null; // Least Used
        this.length = 0;
    }

    #removeNode(node) {
        // Removing node
        if (node === null) return
        // Alice <---> Bob <---> Charlie

        // If there is a node before me (node.prev) [Alice], tell that node's next pointer [Bob] to skip me and point to the node after me (node.next) [Charlie].
        // Setting Previous
        if (node.prev) {
            node.prev.next = node.next;
        }

        // If there is a node after me (node.next) [Charlie], tell that node's prev pointer [Bob] to skip me and point to the node before me (node.prev) [Alice].
        // Setting Next
        if (node.next) {
            node.next.prev = node.prev;
        }

        // Updating Head
        if (node === this.head) {
            this.head = node.next;
        }

        // Updating Tail
        if (node === this.tail) {
            this.tail = node.prev;
        }
    }

    get(key) {
        if (!this.map.get(key)) return;
        const node = this.map.get(key);
        this.#removeNode(node)
        node.prev = null;
        node.next = this.head;

        if (this.head !== null) {
            this.head.prev = node
        }
        this.head = node;

        return node.value;
    }

    put(key, value) {      // key value suggests it hashing
        // Check if we have capacity
        if (this.length === this.capacity) {
            if (!this.map.get(key)) {
                this.#removeNode(this.tail);
                this.length--;
            }
        }

        // if key is already there, remove that existing node, update the tail and head according to current node
        if (this.map.has(key)) {
            // Remove the existing node
            this.#removeNode(this.map.get(key))
        }

        // Create a new node
        const node = {
            next: this.head, // makes this node the head
            prev: null,
            value,
            key
        }

        this.map.set(key, node);
        if (this.head !== null) {
            this.head.prev = node;
        }
        this.head = node;

        if (this.tail === null) {
            this.tail = node
        }
        this.length++


    }

    debug() {
        let current = this.head;
        const arr = [];
        while (current !== null) {
            arr.push(current);
            current = current.next;
        }
        return arr.reduce((acc, curr) => {
            return acc + `--->[ [${curr.key}] : [${curr.value}]] --->`;
        }, "");
    }
}

const cache = new LRUCache(3);
cache.put(1, 10);
cache.put(2, 20);
cache.put(3, 30);
cache.put(4, 40);
cache.put(5, 50);


console.log(cache.debug())
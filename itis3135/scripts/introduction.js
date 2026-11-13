"use strict";

const defaults = {
    firstName: "Kelly",
    middleName: "J.",
    nickname: "",
    lastName: "Garcia",
    acknowledgment: "I understand that this is a public document, and I will not include anything I do not want others to see.",
    acknowledgmentDate: "2026-08-27",
    prettyNameDivider: "|",
    adjectives: "Kind",
    animal: "Goldfish",
    img: "images/KProfile.jpg",
    pictureAlt: "Photo of Kelly Garcia",
    caption: "Glenda messing up my hair",

    personalInfo: {
        statement: "Hi, my name is Kelly, and I am a computer science student. My concentration is in Information Technology. I transferred from Central Piedmont Community College after earning my associate degree.",
        personalBackground: "I am 22 years old, and I am a first-generation college student.",
        professionalBackground: "I am a notary public.",
        academicBackground: "I am a transfer student from CPCC, where I earned my associate degree.",
        subjectBackground: "None.",
        primaryWorkComputer: "I use an HP Pavilion x360 laptop running Windows 11.",
        primaryWorkLocation: "I usually do my work on campus or from home, and sometimes at the public library or a cafe.",
        alternateComputerLocation: "I can borrow my brother’s laptop, rent a laptop, or use a computer at the campus library. I can also work at a cafe."
    },

    courses: [
        {
            department: "ITIS",
            courseNumber: "3135",
            courseTitle: "Front End Web App Development",
            reasonForTaking: "Taking this class to fulfill my concentration requirement."
        },
        {
            department: "ITCS",
            courseNumber: "3153",
            courseTitle: "Intro to Artificial Intelligence",
            reasonForTaking: "Taking this class to fulfill my technical elective requirement."
        },
        {
            department: "ITCS",
            courseNumber: "3162",
            courseTitle: "Introduction to Data Mining",
            reasonForTaking: "Taking this class to fulfill my technical elective requirement."
        },
        {
            department: "ITIS",
            courseNumber: "4010",
            courseTitle: "Topics in Software & Info Syst: Data Ethics",
            reasonForTaking: "Taking this class to fulfill my technical elective requirement."
        },
        {
            department: "ITIS",
            courseNumber: "3200",
            courseTitle: "Intro to Info Security & Priv",
            reasonForTaking: "Taking this class to fulfill my concentration requirement."
        },
        {
            department: "BINF",
            courseNumber: "3103",
            courseTitle: "Sequence Analysis",
            reasonForTaking: "Taking this class to fulfill my technical elective requirement."
        }
    ],

    quote: "“All that we see or seem is but a dream within a dream.”",
    quoteAuthor: "Edgar Allan Poe",
    funnyItem: "",
    somethingToShare: "",

    footerLinks: [
        {
            label: "CLT Web",
            url: "https://webpages.charlotte.edu/kgarci28/"
        },
        {
            label: "GitHub.io",
            url: "https://kgarci28.github.io/"
        },
        {
            label: "GitHub",
            url: "https://github.com/kgarci28"
        },
        {
            label: "freeCodeCamp",
            url: "https://www.freecodecamp.org/kelgarcia"
        },
        {
            label: "Codecademy",
            url: "https://www.codecademy.com/profiles/kgarci28"
        },
        {
            label: "LinkedIn",
            url: "https://www.linkedin.com/in/kelly-j-garcia/"
        }
    ]
};

const form = document.getElementById("introduction-form");
const courseContainer = document.getElementById("courses-container");
const linksContainer = document.getElementById("footer-links-container");
const preview = document.getElementById("image-preview");

let previewUrl = null;
let resultImageUrl = null;
let nextInputId = 0;

function element(tag, content, className) {
    const node = document.createElement(tag);

    if (content !== undefined) {
        node.textContent = content;
    }

    if (className) {
        node.className = className;
    }

    return node;
}

function labeledInput(parent, labelText, key, value, placeholder) {
    const id = `${key}-${++nextInputId}`;

    const label = element("label", labelText);
    label.htmlFor = id;

    const input = element("input");
    input.id = id;
    input.name = key;
    input.dataset.key = key;
    input.placeholder = placeholder;
    input.value = value;
    input.required = true;

    parent.append(label, input);

    return input;
}

function addCourse(course = {
    department: "",
    courseNumber: "",
    courseTitle: "",
    reasonForTaking: ""
}) {
    const group = element("div", undefined, "course-entry");

    labeledInput(
        group,
        "Department *",
        "department",
        course.department,
        "ITIS"
    );

    labeledInput(
        group,
        "Course Number *",
        "courseNumber",
        course.courseNumber,
        "3135"
    );

    labeledInput(
        group,
        "Course Title *",
        "courseTitle",
        course.courseTitle,
        "Course Title"
    );

    labeledInput(
        group,
        "Reason for Taking *",
        "reasonForTaking",
        course.reasonForTaking,
        "Why are you taking this course?"
    );

    const removeButton = element("button", "Remove Course");
    removeButton.type = "button";

    removeButton.addEventListener("click", () => {
        group.remove();
    });

    group.append(removeButton);
    courseContainer.append(group);
}

function setCourses(courses) {
    courseContainer.replaceChildren();
    courses.forEach((course) => addCourse(course));
}

function setLinks(links) {
    linksContainer.replaceChildren();

    links.forEach((link, index) => {
        const group = document.createElement("div");
        group.className = "link-entry";

        const label = document.createElement("label");
        label.textContent = link.label + " *";
        label.htmlFor = `footer-link-${index}`;

        const nameInput = document.createElement("input");
        nameInput.type = "hidden";
        nameInput.dataset.key = "label";
        nameInput.value = link.label;

        const urlInput = document.createElement("input");
        urlInput.type = "url";
        urlInput.id = `footer-link-${index}`;
        urlInput.name = `footer-link-${index}`;
        urlInput.dataset.key = "url";
        urlInput.value = link.url;
        urlInput.placeholder = `Enter ${link.label} URL`;
        urlInput.required = true;

        group.append(label, nameInput, urlInput);
        linksContainer.append(group);
    });
}


function setInputValues(data) {
    const values = {
        ...data,
        ...data.personalInfo
    };

    Object.entries(values).forEach(([key, value]) => {
        const input = document.getElementById(key);

        if (
            input &&
            input.type !== "file" &&
            typeof value === "string"
        ) {
            input.value = value;
        }
    });
}

function updatePreview(file) {
    if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
        previewUrl = null;
    }

    if (file) {
        previewUrl = URL.createObjectURL(file);
        preview.src = previewUrl;
    } else {
        preview.src = defaults.img;
    }
}

// Reset all fields to their original values.
function restoreDefaults() {
    setInputValues(defaults);
    setCourses(defaults.courses);
    setLinks(defaults.footerLinks);

    document.getElementById("img").value = "";
    updatePreview();
}

function clearAll() {
    form.querySelectorAll("input, textarea").forEach((input) => {
        input.value = "";
    });

    setCourses([
        {
            department: "",
            courseNumber: "",
            courseTitle: "",
            reasonForTaking: ""
        }
    ]);

    updatePreview();
}

function readEntries(container, fields) {
    return [...container.children].map((entry) => {
        const record = {};

        fields.forEach((field) => {
            record[field] = entry
                .querySelector(`[data-key="${field}"]`)
                .value.trim();
        });

        return record;
    });
}

function collectData() {
    const read = (id) => document.getElementById(id).value.trim();

    return {
        firstName: read("firstName"),
        middleName: read("middleName"),
        nickname: read("nickname"),
        lastName: read("lastName"),
        acknowledgment: read("acknowledgment"),
        acknowledgmentDate: read("acknowledgmentDate"),
        prettyNameDivider: read("prettyNameDivider"),
        adjectives: read("adjectives"),
        animal: read("animal"),

        img: document.getElementById("img").files[0] || defaults.img,
        pictureAlt: read("pictureAlt"),
        caption: read("caption"),

        personalInfo: {
            statement: read("statement"),
            personalBackground: read("personalBackground"),
            professionalBackground: read("professionalBackground"),
            academicBackground: read("academicBackground"),
            subjectBackground: read("subjectBackground"),
            primaryWorkComputer: read("primaryWorkComputer"),
            primaryWorkLocation: read("primaryWorkLocation"),
            alternateComputerLocation: read("alternateComputerLocation")
        },

        courses: readEntries(courseContainer, [
            "department",
            "courseNumber",
            "courseTitle",
            "reasonForTaking"
        ]),

        quote: read("quote"),
        quoteAuthor: read("quoteAuthor"),
        funnyItem: read("funnyItem"),
        somethingToShare: read("somethingToShare"),

        footerLinks: readEntries(linksContainer, [
            "label",
            "url"
        ])
    };
}

function addBackgroundItem(list, heading, value) {
    const item = element("li");

    item.append(
        element("strong", `${heading}:`),
        document.createTextNode(` ${value}`)
    );

    list.append(item);
    return item;
}

function renderFooterLinks(links) {
    const profileLinks = document.getElementById("profile-links");
    profileLinks.replaceChildren();

    links.forEach((link, index) => {
        if (index > 0) {
            profileLinks.append(document.createTextNode(" | "));
        }

        const anchor = element("a", link.label);
        anchor.href = link.url;

        profileLinks.append(anchor);
    });
}

function renderIntroduction(data) {
    const result = document.getElementById("result-screen");
    result.replaceChildren();

    const middle = data.middleName ? ` ${data.middleName}` : "";
    const displayedName =
        `${data.firstName}${middle} ${data.lastName}`;

    const mascot = `${data.adjectives} ${data.animal}`;

    result.append(
        element(
            "h6",
            `${displayedName} ${data.prettyNameDivider} ${mascot}`
        )
    );

    const figure = element("figure");
    const picture = element("img");

    if (resultImageUrl) {
        URL.revokeObjectURL(resultImageUrl);
        resultImageUrl = null;
    }

    if (data.img instanceof File) {
        resultImageUrl = URL.createObjectURL(data.img);
        picture.src = resultImageUrl;
    } else {
        picture.src = data.img;
    }

    picture.alt = data.pictureAlt;

    figure.append(
        picture,
        element("figcaption", data.caption)
    );

    result.append(
        figure,
        element("p", data.personalInfo.statement)
    );

    const backgrounds = element("ul");

    const labels = [
        ["Personal Background", "personalBackground"],
        ["Professional Background", "professionalBackground"],
        ["Academic Background", "academicBackground"],
        ["Background in This Subject", "subjectBackground"],
        ["Primary Work Computer", "primaryWorkComputer"],
        ["Primary Work Location", "primaryWorkLocation"],
        ["Alternate Computer & Location", "alternateComputerLocation"]
    ];

    labels.forEach(([label, key]) => {
        addBackgroundItem(
            backgrounds,
            label,
            data.personalInfo[key]
        );
    });

    const coursesItem = element("li");
    coursesItem.append(
        element("strong", "Courses I’m Taking and Why:")
    );

    const ordered = element("ol");

    data.courses.forEach((course) => {
        const li = element("li");

        li.append(
            element(
                "strong",
                `${course.department} ${course.courseNumber} - ${course.courseTitle}:`
            ),
            document.createTextNode(
                ` ${course.reasonForTaking}`
            )
        );

        ordered.append(li);
    });

    coursesItem.append(ordered);
    backgrounds.append(coursesItem);
    result.append(backgrounds);

    // Quotation.
    const blockquote = element("blockquote");
    const authorParagraph = element("p");

    authorParagraph.append(
        element("em", `- ${data.quoteAuthor}`)
    );

    blockquote.append(
        element("p", data.quote),
        authorParagraph
    );

    result.append(blockquote);

    // Optional information.
    if (data.funnyItem) {
        result.append(
            element("p", `Funny thing: ${data.funnyItem}`)
        );
    }

    if (data.somethingToShare) {
        result.append(
            element(
                "p",
                `Something I would like to share: ${data.somethingToShare}`
            )
        );
    }

    renderFooterLinks(data.footerLinks);

    document.getElementById("form-screen").hidden = true;
    result.hidden = false;

    document.getElementById("return-link").style.display = "block";

    window.scrollTo(0, 0);
}

function displayForm() {
    const result = document.getElementById("result-screen");

    result.hidden = true;
    result.replaceChildren();

    if (resultImageUrl) {
        URL.revokeObjectURL(resultImageUrl);
        resultImageUrl = null;
    }

    document.getElementById("form-screen").hidden = false;
    document.getElementById("return-link").style.display = "none";

    restoreDefaults();
    renderFooterLinks(defaults.footerLinks);
}

// Add a new course.
document.getElementById("add-course").addEventListener(
    "click",
    () => addCourse()
);

document.getElementById("clear-form").addEventListener(
    "click",
    clearAll
);

document.getElementById("img").addEventListener(
    "change",
    (event) => {
        updatePreview(event.target.files[0]);
    }
);

form.addEventListener("reset", (event) => {
    event.preventDefault();
    restoreDefaults();
});

form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.reportValidity()) {
        return;
    }

    if (courseContainer.children.length === 0) {
        addCourse();
        courseContainer.querySelector("input").focus();
        return;
    }

    const data = collectData();
    renderIntroduction(data);
});

document.getElementById("start-over").addEventListener(
    "click",
    (event) => {
        event.preventDefault();
        displayForm();
    }
);

restoreDefaults();
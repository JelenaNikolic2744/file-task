import axios from 'axios';
import { NextFunction, Request, Response } from "express";

interface Files {
    fileUrl: string
}

export async function getFiles(req: Request, res: Response, next: NextFunction): Promise<Response> {
    let files = await getExternalAPI()
    let sortedData = sortFiles(files.data.items)
    return res.send(sortedData)
}

function sortFiles(data: Files[]): any {
    const treeRoot = {};
    data.forEach((item) => {
        if (item.fileUrl) {
            const { host, segments } = formatLinkRemoveHttp(item.fileUrl)

            if (!treeRoot[host]) {
                treeRoot[host] = [];
            }

            let currentStructure = treeRoot[host];

            segments.forEach((element, index) => {
                const isFile = checkIsFile(element, index, segments)

                if (isFile) {
                    if (!currentStructure.includes(element)) {
                        currentStructure.push(element);
                    }
                } else {
                    let existingDir = checkIsDirectoryAdded(currentStructure, element)

                    if (!existingDir) {
                        //create a new directory as an array
                        existingDir = { [element]: [] };
                        currentStructure.push(existingDir);
                    }
                    currentStructure = existingDir[element];
                }
            });
        }
    });
    return treeRoot;
}

//go through and check if directory is already added
function checkIsDirectoryAdded(currentStructure: any, element: string): any {
    return currentStructure.find(
        (node) => typeof node === "object" && node[element]
    );
}

//check if element is file
function checkIsFile(element: string, index: number, segments: string[]): boolean {
    return index === segments.length - 1 && element.includes(".");
}

//break down into valid segments. replaces url.parse
function formatLinkRemoveHttp(file: string): { host: string, segments: string[] } {
    const validUrl = new URL(file);
    return { host: validUrl.host, segments: validUrl.pathname.split("/").filter(Boolean) }
}

//get external API
async function getExternalAPI(): Promise<any> {
    return await axios.get('https://rest-test-eight.vercel.app/api/test')
}
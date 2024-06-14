import axios from 'axios';
import { NextFunction, Request, Response } from "express";

interface Files {
    fileUrl: string
}

//calling functions to get and sort data, returning sorted data in requested form
export async function getFiles(req: Request, res: Response, next: NextFunction): Promise<Response> {
    let files = await getExternalAPI()
    if (!files) {
        res.status(400).send({
            message: 'Error'
        });
    }
    let sortedData = sortFiles(files.data.items)
    return res.send(sortedData)
}

//utilising basic tree data structure for creating a valid file directory mapping. Returning formatted json directory structure
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

//transforming url from string and extracting host from that url. Spliting into segments fileUrl string by / 
function formatLinkRemoveHttp(file: string): { host: string, segments: string[] } {
    const validUrl = new URL(file);
    return { host: validUrl.host, segments: validUrl.pathname.split("/").filter(Boolean) }
}

//get data from provided external API
async function getExternalAPI(): Promise<any> {
    return await axios.get('https://rest-test-eight.vercel.app/api/test')
}
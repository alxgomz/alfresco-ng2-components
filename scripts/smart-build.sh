#!/usr/bin/env bash

smart_build_process_services_cloud() {
    echo "========= Process Services Cloud ========="
    echo "====== lint ======"
    ./node_modules/.bin/tslint -p ./lib/process-services-cloud/tsconfig.json -c ./lib/tslint.json || exit 1

    echo "====== Unit test ======"
    #ng test process-services-cloud --watch=false || exit 1

    echo "====== Build ======"
    ng build process-services-cloud || exit 1

    echo "====== Build style ======"
    node ./lib/config/bundle-process-services-cloud-scss.js || exit 1

    echo "====== Copy i18n ======"
    mkdir -p ./lib/dist/process-services-cloud/bundles/assets/adf-process-services-cloud/i18n
    cp -R ./lib/process-services-cloud/src/lib/i18n/* ./lib/dist/process-services-cloud/bundles/assets/adf-process-services-cloud/i18n

    echo "====== Copy assets ======"
    cp -R ./lib/process-services-cloud/src/lib/assets/* ./lib/dist/process-services-cloud/bundles/assets

    echo "====== Move to node_modules ======"
    rm -rf ./node_modules/@alfresco/adf-process-cloud/ && \
    mkdir -p ./node_modules/@alfresco/adf-process-services-cloud/ && \
    cp -R ./lib/dist/process-services-cloud/* ./node_modules/@alfresco/adf-process-services-cloud/
}

eval SHA_1=$1
eval SHA_2=$2

if [[ "$1" == "" ]]
then
    echo "The SHA1 is mandatory"
    exit 0
fi

#find affected libs
npm run affected:libs -- $SHA_1 $SHA_2 > deps.txt

#clean file
sed -i '/^$/d'  ./deps.txt
sed -i '/alfresco-components/d' ./deps.txt
sed -i '/nx affected:libs/d' ./deps.txt
sed -i '/^$/d'  ./deps.txt

#read result from file
while IFS= read -r var
do
    fileLine=$var
done < "./deps.txt"

echo "Libs changed: $fileLine";
#transform string to array
libs=(`echo $fileLine | sed 's/^$/\n/g'`)

if [[ "${deps}" == "content-services" ]]
then
    echo "NG2 components version required with -v | -version"
    exit 0
fi

#process-services
for i in "${libs[@]}"
do
    if [ "$i" == "process-services" ] ; then
        echo "========= Process Services ========="
        echo "====== lint ======"
        ./node_modules/.bin/tslint -p ./lib/process-services/tsconfig.json -c ./lib/tslint.json || exit 1

        echo "====== Unit test ======"
        #ng test process-services --watch=false

        echo "====== Build ======"
        ng build process-services

        echo "====== Build style ======"
        node ./lib/config/bundle-process-services-scss.js

        echo "====== Copy i18n ======"
        mkdir -p ./lib/dist/process-services/bundles/assets/adf-process-services/i18n
        cp -R ./lib/process-services/src/lib/i18n/* ./lib/dist/process-services/bundles/assets/adf-process-services/i18n

        echo "====== Copy assets ======"
        cp -R ./lib/process-services/src/lib/assets/* ./lib/dist/process-services/bundles/assets

        echo "====== Move to node_modules ======"
        rm -rf ./node_modules/@alfresco/adf-process-services/ && \
        mkdir -p ./node_modules/@alfresco/adf-process-services/ && \
        cp -R ./lib/dist/process-services/* ./node_modules/@alfresco/adf-process-services/

    fi
done

#cloud
for i in "${libs[@]}"
do
    if [ "$i" == "process-services-cloud" ] ; then
        echo "========= Process Services Cloud ========="
        echo "====== lint ======"
        ./node_modules/.bin/tslint -p ./lib/process-services-cloud/tsconfig.json -c ./lib/tslint.json || exit 1

        echo "====== Unit test ======"
        ng test process-services-cloud --watch=false || exit 1

        echo "====== Build ======"
        ng build process-services-cloud || exit 1

        echo "====== Build style ======"
        node ./lib/config/bundle-process-services-cloud-scss.js || exit 1

        echo "====== Copy i18n ======"
        mkdir -p ./lib/dist/process-services-cloud/bundles/assets/adf-process-services-cloud/i18n
        cp -R ./lib/process-services-cloud/src/lib/i18n/* ./lib/dist/process-services-cloud/bundles/assets/adf-process-services-cloud/i18n

        echo "====== Copy assets ======"
        cp -R ./lib/process-services-cloud/src/lib/assets/* ./lib/dist/process-services-cloud/bundles/assets

        echo "====== Move to node_modules ======"
        rm -rf ./node_modules/@alfresco/adf-process-cloud/ && \
        mkdir -p ./node_modules/@alfresco/adf-process-services-cloud/ && \
        cp -R ./lib/dist/process-services-cloud/* ./node_modules/@alfresco/adf-process-services-cloud/
    fi
done

rm deps.txt